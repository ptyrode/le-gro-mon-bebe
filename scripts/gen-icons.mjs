#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE = '_temp/baby-bottle.svg';
const BRAND = '#f46441';
const BOTTLE_BOX = { x: 176.363, y: 68.6, width: 156.111, height: 371.6 };
const SUBJECT = 0.5;

if (!existsSync(SOURCE)) {
    throw new Error(`Source introuvable : ${SOURCE}`);
}

function bottlePath() {
    const svg = readFileSync(SOURCE, 'utf8');
    const d = svg.match(/ d="([^"]+)"/)?.[1];
    if (!d) throw new Error(`Aucun tracé trouvé dans ${SOURCE}`);
    const start = d.indexOf('M332.474');
    if (start < 0) throw new Error('Tracé du biberon introuvable');
    return d.slice(start);
}

const BOTTLE = bottlePath();

function iconSvg({ size, radius }) {
    const scale = (SUBJECT * size) / BOTTLE_BOX.height;
    const tx = (size - BOTTLE_BOX.width * scale) / 2 - BOTTLE_BOX.x * scale;
    const ty = (size - BOTTLE_BOX.height * scale) / 2 - BOTTLE_BOX.y * scale;
    return Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
            `<rect width="${size}" height="${size}" rx="${radius * size}" ry="${radius * size}" fill="${BRAND}"/>` +
            `<g transform="translate(${tx} ${ty}) scale(${scale})">` +
            `<path fill="#ffffff" d="${BOTTLE}"/>` +
            `</g></svg>`
    );
}

function png({ size, radius }) {
    return sharp(iconSvg({ size, radius }), { density: 288 })
        .resize(size, size)
        .png({ compressionLevel: 9 })
        .toBuffer();
}

function ico(images) {
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);
    header.writeUInt16LE(1, 2);
    header.writeUInt16LE(images.length, 4);

    let offset = 6 + images.length * 16;
    const entries = images.map(({ size, data }) => {
        const entry = Buffer.alloc(16);
        entry.writeUInt8(size >= 256 ? 0 : size, 0);
        entry.writeUInt8(size >= 256 ? 0 : size, 1);
        entry.writeUInt16LE(1, 4);
        entry.writeUInt16LE(32, 6);
        entry.writeUInt32LE(data.length, 8);
        entry.writeUInt32LE(offset, 12);
        offset += data.length;
        return entry;
    });

    return Buffer.concat([
        header,
        ...entries,
        ...images.map(({ data }) => data),
    ]);
}

const ROUNDED = 0.22;

const TARGETS = [
    { file: 'public/icon-192.png', size: 192, radius: ROUNDED },
    { file: 'public/icon-512.png', size: 512, radius: ROUNDED },
    { file: 'src/app/icon.png', size: 512, radius: ROUNDED },
    { file: 'src/app/apple-icon.png', size: 180, radius: 0 },
];

for (const { file, ...opts } of TARGETS) {
    const data = await png(opts);
    writeFileSync(file, data);
    console.log(
        `  ${file} — ${opts.size}px` +
            `${opts.radius ? `, coins ${Math.round(opts.radius * 100)} %` : ', carré plein'}`
    );
}

const favicon = 'src/app/favicon.ico';
const sizes = [16, 32, 48];
writeFileSync(
    favicon,
    ico(
        await Promise.all(
            sizes.map(async (size) => ({
                size,
                data: await png({ size, radius: ROUNDED }),
            }))
        )
    )
);
console.log(`  ${favicon} — ${sizes.join(' / ')}px`);

console.log(
    `\n✅ ${TARGETS.length + 1} fichiers écrits depuis ${path.basename(SOURCE)},` +
        ` biberon à ${Math.round(SUBJECT * 100)} % du cadre partout.`
);
