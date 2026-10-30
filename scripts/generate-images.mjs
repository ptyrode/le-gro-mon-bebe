#!/usr/bin/env node
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

import { buildPrompt } from './image-prompts.mjs';

const CATEGORIES = ['cheeses', 'fish', 'animals', 'desserts', 'fruits'];
const MODEL = 'gpt-image-2.5-sunburst-2026-09-08';
const REFERENCES = [
    'scripts/data/style-references/fruits.webp',
    'scripts/data/style-references/cheeses.webp',
    'scripts/data/style-references/animals-1.webp',
    'scripts/data/style-references/animals-2.webp',
];
const TARGET_SIZE = 512;
const WEBP_QUALITY = 82;
const CONCURRENCY = 3;
const RAW_FOLDER = '_temp/images';
const MARGIN = 0.06;
const SUBJECT_THRESHOLD = 30;
const SUBJECT_PADDING = 16;
const FADE_FROM = 14;
const FADE_WIDTH = 24;
const BACKGROUND = { r: 255, g: 244, b: 238 };

const args = process.argv.slice(2);
const dryRun = args.includes('--dry');
const reframeOnly = args.includes('--reframe');
const [category, ...weekArgs] = args.filter((a) => !a.startsWith('--'));

if (!CATEGORIES.includes(category)) {
    console.error(
        'Usage : node scripts/generate-images.mjs <catégorie> [semaines…] [--dry | --reframe]\n' +
            '  ex. : node scripts/generate-images.mjs desserts 4-7 12\n' +
            `  catégories : ${CATEGORIES.join(', ')}`
    );
    process.exit(1);
}

const weeks = new Set(
    weekArgs.flatMap((arg) => {
        const [from, to = from] = arg.split('-').map(Number);
        return Array.from({ length: to - from + 1 }, (_, i) => from + i);
    })
);

const { items } = JSON.parse(
    await readFile(`src/data/categories/${category}.json`, 'utf8')
);
const subjects = items
    .filter((item) => !weeks.size || weeks.has(item.week))
    .map((item) => ({ ...item, prompt: buildPrompt(category, item.name) }));

if (dryRun) {
    for (const s of subjects) {
        console.log(`\n===== S${s.week} — ${s.name} =====\n${s.prompt}`);
    }
    process.exit(0);
}

const folder = path.join('public', 'images', category);
const rawPath = (week) => path.join(RAW_FOLDER, `${category}-${week}.png`);

const frame = async (raw, destination) => {
    const { data, info } = await sharp(raw)
        .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
    const { width, height } = info;
    const [r0, g0, b0] = data;
    const distance = new Uint16Array(width * height);
    for (let p = 0; p < width * height; p++) {
        distance[p] =
            Math.abs(data[p * 3] - r0) +
            Math.abs(data[p * 3 + 1] - g0) +
            Math.abs(data[p * 3 + 2] - b0);
    }

    const outside = new Uint8Array(width * height);
    const queue = new Int32Array(width * height);
    let head = 0;
    let tail = 0;
    const visit = (p) => {
        if (!outside[p] && distance[p] < FADE_FROM + FADE_WIDTH) {
            outside[p] = 1;
            queue[tail++] = p;
        }
    };
    for (let x = 0; x < width; x++) {
        visit(x);
        visit((height - 1) * width + x);
    }
    for (let y = 0; y < height; y++) {
        visit(y * width);
        visit(y * width + width - 1);
    }
    while (head < tail) {
        const p = queue[head++];
        const x = p % width;
        if (x > 0) visit(p - 1);
        if (x < width - 1) visit(p + 1);
        if (p >= width) visit(p - width);
        if (p < (height - 1) * width) visit(p + width);
    }

    const rgba = Buffer.alloc(width * height * 4);
    let top = height;
    let bottom = 0;
    let left = width;
    let right = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const p = y * width + x;
            rgba[p * 4] = data[p * 3];
            rgba[p * 4 + 1] = data[p * 3 + 1];
            rgba[p * 4 + 2] = data[p * 3 + 2];
            rgba[p * 4 + 3] = outside[p]
                ? Math.round(
                      255 * Math.max(0, (distance[p] - FADE_FROM) / FADE_WIDTH)
                  )
                : 255;
            if (distance[p] > SUBJECT_THRESHOLD) {
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
                left = Math.min(left, x);
                right = Math.max(right, x);
            }
        }
    }

    top = Math.max(0, top - SUBJECT_PADDING);
    left = Math.max(0, left - SUBJECT_PADDING);
    bottom = Math.min(height - 1, bottom + SUBJECT_PADDING);
    right = Math.min(width - 1, right + SUBJECT_PADDING);

    const inner = Math.round(TARGET_SIZE * (1 - 2 * MARGIN));
    const subject = await sharp(rgba, {
        raw: { width, height, channels: 4 },
    })
        .extract({
            left,
            top,
            width: right - left + 1,
            height: bottom - top + 1,
        })
        .resize(inner, inner, { fit: 'inside' })
        .png()
        .toBuffer({ resolveWithObject: true });
    await sharp({
        create: {
            width: TARGET_SIZE,
            height: TARGET_SIZE,
            channels: 3,
            background: BACKGROUND,
        },
    })
        .composite([
            {
                input: subject.data,
                left: Math.floor((TARGET_SIZE - subject.info.width) / 2),
                top: Math.floor((TARGET_SIZE - subject.info.height) / 2),
            },
        ])
        .webp({ quality: WEBP_QUALITY })
        .toFile(destination);
};

if (reframeOnly) {
    let count = 0;
    for (const s of subjects) {
        try {
            await frame(
                rawPath(s.week),
                path.join(folder, `${category}-${s.week}.webp`)
            );
            count++;
        } catch {
            console.log(`  ⏭️  S${s.week} : pas d'original dans ${RAW_FOLDER}`);
        }
    }
    console.log(`${count} image(s) recadrée(s) dans ${folder}.`);
    process.exit(0);
}

try {
    process.loadEnvFile('.env');
} catch {}
if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY absente : la renseigner dans .env.');
    process.exit(1);
}

await mkdir(folder, { recursive: true });
await mkdir(RAW_FOLDER, { recursive: true });

const references = await Promise.all(
    REFERENCES.map(async (file) => ({
        name: `${path.basename(file, '.webp')}.png`,
        data: await sharp(file).png().toBuffer(),
    }))
);

const exists = (file) =>
    access(file).then(
        () => true,
        () => false
    );

const todo = [];
for (const s of subjects) {
    const destination = path.join(folder, `${category}-${s.week}.webp`);
    if (await exists(destination)) {
        console.log(`  ⏭️  S${s.week} déjà présente, ignorée`);
    } else {
        todo.push({ ...s, destination });
    }
}

const generate = async (subject) => {
    const form = new FormData();
    form.append('model', MODEL);
    form.append('prompt', subject.prompt);
    form.append('size', '1024x1024');
    form.append('n', '1');
    for (const ref of references) {
        form.append(
            'image[]',
            new Blob([ref.data], { type: 'image/png' }),
            ref.name
        );
    }

    const response = await fetch('https://api.openai.com/v1/images/edits', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        body: form,
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.error?.message ?? `HTTP ${response.status}`);
    }

    const raw = Buffer.from(json.data[0].b64_json, 'base64');
    await writeFile(rawPath(subject.week), raw);
    await frame(raw, subject.destination);
    return json.usage;
};

console.log(
    `${todo.length} image(s) à générer avec ${MODEL}, ${CONCURRENCY} en parallèle.\n`
);

let failures = 0;
for (let i = 0; i < todo.length; i += CONCURRENCY) {
    await Promise.all(
        todo.slice(i, i + CONCURRENCY).map(async (subject) => {
            try {
                const usage = await generate(subject);
                console.log(
                    `  ✅ S${subject.week} — ${subject.name}` +
                        (usage ? ` (${usage.total_tokens} tokens)` : '')
                );
            } catch (error) {
                failures++;
                console.error(
                    `  ❌ S${subject.week} — ${subject.name} : ${error.message}`
                );
            }
        })
    );
}

console.log(
    `\n${todo.length - failures}/${todo.length} image(s) écrite(s) dans ${folder}.` +
        (failures
            ? ' Relancer la même commande pour réessayer les échecs.'
            : '')
);
