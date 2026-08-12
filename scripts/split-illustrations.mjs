#!/usr/bin/env node
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const CATEGORIES = ['fruits', 'fish', 'cheeses', 'animals'];
const TARGET_SIZE = 512;
const WEBP_QUALITY = 82;
const BACKGROUND = { r: 255, g: 244, b: 238 };

const [, , source, category, weekArg, colsArg = '2', rowsArg = '2'] =
    process.argv;

if (!source || !category || !weekArg) {
    console.error(
        'Usage : node scripts/split-illustrations.mjs <sheet.png> <catégorie> <semaineDépart> [cols] [rows]'
    );
    process.exit(1);
}
if (!CATEGORIES.includes(category)) {
    console.error(
        `Catégorie inconnue : « ${category} ». Attendu : ${CATEGORIES.join(', ')}.`
    );
    process.exit(1);
}

const startWeek = Number(weekArg);
const cols = Number(colsArg);
const rows = Number(rowsArg);

if (!Number.isInteger(startWeek) || startWeek < 4 || startWeek > 41) {
    console.error('La week de départ doit être un entier entre 4 et 41.');
    process.exit(1);
}
if (
    !Number.isInteger(cols) ||
    !Number.isInteger(rows) ||
    cols < 1 ||
    rows < 1
) {
    console.error('cols et rows doivent être des entiers positifs.');
    process.exit(1);
}
const MAX_WEEK = 41;

const folder = path.join('public', 'images', category);
await mkdir(folder, { recursive: true });

const image = sharp(source);
const { width, height } = await image.metadata();
const tileWidth = Math.floor(width / cols);
const tileHeight = Math.floor(height / rows);

console.log(
    `Planche ${width}×${height} → ${cols}×${rows} vignettes de ${tileWidth}×${tileHeight} px`
);
if (tileWidth < TARGET_SIZE) {
    console.warn(
        `⚠️  Vignettes de ${tileWidth} px, en dessous des ${TARGET_SIZE} px visés : ` +
            `générer des planches plus grandes, ou moins de vignettes par sheet.`
    );
}

let week = startWeek;
let skipped = 0;
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        if (week > MAX_WEEK) {
            skipped++;
            continue;
        }
        const destination = path.join(folder, `${category}-${week}.webp`);
        try {
            await access(destination);
            console.error(
                `✋ ${destination} existe déjà — rien n'a été écrasé. ` +
                    `Le supprimer d'abord si le remplacement est voulu.`
            );
            process.exit(1);
        } catch {}
        await sharp(source)
            .extract({
                left: x * tileWidth,
                top: y * tileHeight,
                width: tileWidth,
                height: tileHeight,
            })
            .resize(TARGET_SIZE, TARGET_SIZE, {
                fit: tileWidth === tileHeight ? 'cover' : 'contain',
                background: BACKGROUND,
            })
            .webp({ quality: WEBP_QUALITY })
            .toFile(destination);
        console.log(`  ${destination}`);
        week++;
    }
}

console.log(
    `\n✅ ${week - startWeek} image(s) écrite(s) (semaines ${startWeek} à ${week - 1}).` +
        (skipped
            ? ` ${skipped} vignette(s) au-delà de S${MAX_WEEK} ignorée(s).`
            : '')
);
console.log(
    '   Vérifier la correspondance avec : node scripts/check-illustrations.mjs'
);
