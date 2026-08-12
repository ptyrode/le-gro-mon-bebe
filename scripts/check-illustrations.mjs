#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const CATEGORIES = ['fruits', 'fish', 'cheeses', 'animals'];
const EXPECTED_SIZE = 512;

let issues = 0;

for (const category of CATEGORIES) {
    const items = JSON.parse(
        await readFile(`src/data/categories/${category}.json`, 'utf8')
    ).items;
    const expected = new Map(items.map((i) => [i.week, i.name]));

    const folder = path.join('public', 'images', category);
    let files = [];
    try {
        files = (await readdir(folder)).filter((f) => f.endsWith('.webp'));
    } catch {
        issues++;
        console.log(
            `\n${category} : 0/${expected.size} images — folder ${folder} absent`
        );
        continue;
    }

    const present = new Map();
    const invalid = [];
    for (const f of files) {
        const m = f.match(new RegExp(`^${category}-(\\d+)\\.webp$`));
        if (!m) {
            invalid.push(f);
            continue;
        }
        present.set(Number(m[1]), f);
    }

    const missing = [...expected.keys()].filter((w) => !present.has(w));
    const extra = [...present.keys()].filter((w) => !expected.has(w));

    console.log(
        `\n${category} : ${present.size}/${expected.size} images` +
            (missing.length || extra.length || invalid.length ? '' : ' ✅')
    );

    if (invalid.length) {
        issues++;
        console.log(`  ⚠️  nom non conforme : ${invalid.join(', ')}`);
    }
    if (extra.length) {
        issues++;
        console.log(`  ⚠️  week sans item correspondant : ${extra.join(', ')}`);
    }
    if (missing.length) {
        issues++;
        console.log(`  missing (${missing.length}) :`);
        for (const w of missing) {
            console.log(`      ${category}-${w}.webp → ${expected.get(w)}`);
        }
    }

    for (const [week, file] of [...present].sort((a, b) => a[0] - b[0])) {
        const { width, height } = await sharp(
            path.join(folder, file)
        ).metadata();
        if (width !== EXPECTED_SIZE || height !== EXPECTED_SIZE) {
            issues++;
            console.log(
                `  ⚠️  ${file} fait ${width}×${height}, attendu ${EXPECTED_SIZE}×${EXPECTED_SIZE}` +
                    ` (week ${week} : ${expected.get(week)})`
            );
        }
    }
}

console.log(
    issues
        ? `\n${issues} point(s) à corriger.`
        : '\n✅ Toutes les illustrations sont en place.'
);
process.exit(issues ? 1 : 0);
