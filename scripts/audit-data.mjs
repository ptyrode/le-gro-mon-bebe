#!/usr/bin/env node
import { readFile } from 'node:fs/promises';

const CATEGORIES = ['cheeses', 'fish', 'animals', 'desserts', 'fruits'];
const OK = [0.75, 1.35];
const WARNING = [0.5, 2.0];
const RULE = '='.repeat(78);

const readJson = async (file) => JSON.parse(await readFile(file, 'utf8'));

const growth = (await readJson('src/data/fetalGrowth.json')).weeks;
const sizes = await readJson('scripts/data/item-sizes.json');

const verdict = (ratio) => {
    if (ratio >= OK[0] && ratio <= OK[1]) return 'OK';
    if (ratio >= WARNING[0] && ratio <= WARNING[1]) return 'LIMITE';
    return 'PROBLEME';
};

const summary = [];
let missing = 0;

for (const category of CATEGORIES) {
    const { items } = await readJson(`src/data/categories/${category}.json`);
    const counts = { OK: 0, LIMITE: 0, PROBLEME: 0 };
    const flagged = [];
    const regressions = [];
    let previous = null;

    for (const { week, name } of items) {
        const fetus = growth[week].size;
        const size = sizes[category]?.[name];
        if (size === undefined) {
            missing++;
            console.error(
                `⚠️  ${category} S${week} : « ${name} » n'a pas de taille dans scripts/data/item-sizes.json`
            );
            continue;
        }
        const ratio = size / fetus;
        const result = verdict(ratio);
        counts[result]++;
        if (result !== 'OK') {
            flagged.push({ week, name, fetus, size, ratio, result });
        }
        if (previous !== null && size < previous) {
            regressions.push({ week, name, size, previous });
        }
        previous = size;
    }

    summary.push({ category, counts, regressions });

    console.log(
        `\n${RULE}\n${category.toUpperCase()}  —  OK ${counts.OK} | limite ${counts.LIMITE} | problème ${counts.PROBLEME}\n${RULE}`
    );
    for (const { week, name, fetus, size, ratio, result } of flagged) {
        const flag = result === 'PROBLEME' ? '!!' : ' ~';
        console.log(
            `${flag} S${String(week).padEnd(3)} ${name.padEnd(30)} fœtus ${String(fetus).padStart(5)} cm | objet ~${String(size).padStart(5)} cm | x${ratio.toFixed(2)}`
        );
    }
    if (regressions.length) {
        console.log(
            `\n  -- Régressions de taille (${regressions.length}) : l'item est plus petit que celui de la semaine précédente`
        );
        for (const { week, name, size, previous: before } of regressions) {
            console.log(
                `     S${week}: ${name} (~${size} cm) < semaine précédente (~${before} cm)`
            );
        }
    }
}

console.log(`\n${RULE}\nRÉCAPITULATIF\n${RULE}`);
console.log(
    `${'catégorie'.padEnd(12)} ${'OK'.padStart(4)} ${'limite'.padStart(7)} ${'problème'.padStart(9)} ${'régressions'.padStart(12)}`
);
for (const { category, counts, regressions } of summary) {
    console.log(
        `${category.padEnd(12)} ${String(counts.OK).padStart(4)} ${String(counts.LIMITE).padStart(7)} ${String(counts.PROBLEME).padStart(9)} ${String(regressions.length).padStart(12)}`
    );
}

const failures = summary.reduce(
    (total, { counts, regressions }) =>
        total + counts.PROBLEME + regressions.length,
    missing
);
process.exitCode = failures ? 1 : 0;
