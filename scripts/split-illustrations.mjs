#!/usr/bin/env node
import { access, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const CATEGORIES = ['fruits', 'fish', 'cheeses', 'animals'];
const TAILLE_CIBLE = 1024;

const [, , source, categorie, semaineArg, colsArg = '2', rowsArg = '2'] =
    process.argv;

if (!source || !categorie || !semaineArg) {
    console.error(
        'Usage : node scripts/split-illustrations.mjs <planche.png> <catégorie> <semaineDépart> [cols] [rows]'
    );
    process.exit(1);
}
if (!CATEGORIES.includes(categorie)) {
    console.error(
        `Catégorie inconnue : « ${categorie} ». Attendu : ${CATEGORIES.join(', ')}.`
    );
    process.exit(1);
}

const semaineDepart = Number(semaineArg);
const cols = Number(colsArg);
const rows = Number(rowsArg);

if (
    !Number.isInteger(semaineDepart) ||
    semaineDepart < 4 ||
    semaineDepart > 41
) {
    console.error('La semaine de départ doit être un entier entre 4 et 41.');
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
if (semaineDepart + cols * rows - 1 > 41) {
    console.error(
        `Cette planche couvrirait jusqu'à la semaine ${semaineDepart + cols * rows - 1}, au-delà de 41.`
    );
    process.exit(1);
}

const dossier = path.join('public', 'illustrations', categorie);
await mkdir(dossier, { recursive: true });

const image = sharp(source);
const { width, height } = await image.metadata();
const tuileL = Math.floor(width / cols);
const tuileH = Math.floor(height / rows);

console.log(
    `Planche ${width}×${height} → ${cols}×${rows} vignettes de ${tuileL}×${tuileH} px`
);
if (tuileL < TAILLE_CIBLE) {
    console.warn(
        `⚠️  Vignettes de ${tuileL} px, en dessous des ${TAILLE_CIBLE} px visés : ` +
            `générer des planches plus grandes, ou moins de vignettes par planche.`
    );
}

let semaine = semaineDepart;
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const destination = path.join(dossier, `${categorie}-${semaine}.png`);
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
                left: x * tuileL,
                top: y * tuileH,
                width: tuileL,
                height: tuileH,
            })
            .resize(TAILLE_CIBLE, TAILLE_CIBLE, { fit: 'cover' })
            .png({ compressionLevel: 9 })
            .toFile(destination);
        console.log(`  ${destination}`);
        semaine++;
    }
}

console.log(
    `\n✅ ${cols * rows} images écrites (semaines ${semaineDepart} à ${semaine - 1}).`
);
console.log(
    '   Vérifier la correspondance avec : node scripts/check-illustrations.mjs'
);
