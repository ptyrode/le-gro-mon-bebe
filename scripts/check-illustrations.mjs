#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const CATEGORIES = ['fruits', 'fish', 'cheeses', 'animals'];
const TAILLE_ATTENDUE = 1024;

let problemes = 0;

for (const categorie of CATEGORIES) {
    const items = JSON.parse(
        await readFile(`src/data/categories/${categorie}.json`, 'utf8')
    ).items;
    const attendus = new Map(items.map((i) => [i.week, i.name]));

    const dossier = path.join('public', 'illustrations', categorie);
    let fichiers = [];
    try {
        fichiers = (await readdir(dossier)).filter((f) => f.endsWith('.png'));
    } catch {
        problemes++;
        console.log(
            `\n${categorie} : 0/${attendus.size} images — dossier ${dossier} absent`
        );
        continue;
    }

    const presentes = new Map();
    const invalides = [];
    for (const f of fichiers) {
        const m = f.match(new RegExp(`^${categorie}-(\\d+)\\.png$`));
        if (!m) {
            invalides.push(f);
            continue;
        }
        presentes.set(Number(m[1]), f);
    }

    const manquantes = [...attendus.keys()].filter((w) => !presentes.has(w));
    const superflues = [...presentes.keys()].filter((w) => !attendus.has(w));

    console.log(
        `\n${categorie} : ${presentes.size}/${attendus.size} images` +
            (manquantes.length || superflues.length || invalides.length
                ? ''
                : ' ✅')
    );

    if (invalides.length) {
        problemes++;
        console.log(`  ⚠️  nom non conforme : ${invalides.join(', ')}`);
    }
    if (superflues.length) {
        problemes++;
        console.log(
            `  ⚠️  semaine sans item correspondant : ${superflues.join(', ')}`
        );
    }
    if (manquantes.length) {
        problemes++;
        console.log(`  manquantes (${manquantes.length}) :`);
        for (const w of manquantes) {
            console.log(`      ${categorie}-${w}.png → ${attendus.get(w)}`);
        }
    }

    for (const [semaine, fichier] of [...presentes].sort(
        (a, b) => a[0] - b[0]
    )) {
        const { width, height } = await sharp(
            path.join(dossier, fichier)
        ).metadata();
        if (width !== TAILLE_ATTENDUE || height !== TAILLE_ATTENDUE) {
            problemes++;
            console.log(
                `  ⚠️  ${fichier} fait ${width}×${height}, attendu ${TAILLE_ATTENDUE}×${TAILLE_ATTENDUE}` +
                    ` (semaine ${semaine} : ${attendus.get(semaine)})`
            );
        }
    }
}

console.log(
    problemes
        ? `\n${problemes} point(s) à corriger.`
        : '\n✅ Toutes les illustrations sont en place.'
);
process.exit(problemes ? 1 : 0);
