import { categories, growth, weightJokes } from '@/constants/data';
import { MAX_WEEK, MIN_WEEK } from '@/constants/weeks';

function clampWeek(week: number): number {
    return Math.min(MAX_WEEK, Math.max(MIN_WEEK, week));
}

function getGrowthForWeek(week: number): GrowthWeek | undefined {
    return growth.weeks[String(clampWeek(week))];
}

function getEquivalenceForWeek(
    category: CategoryKey,
    week: number
): CategoryItem {
    const items = categories[category].items;
    const w = clampWeek(week);
    let match = items[0];
    for (const item of items) {
        if (item.week <= w) match = item;
        else break;
    }
    return match;
}

function getWeightJokeForWeek(week: number): string | undefined {
    return weightJokes.weeks[String(clampWeek(week))];
}

function formatWeight(weight: number): {
    value: string;
    unit: 'g' | 'kg';
} {
    if (weight >= 1000) {
        return {
            value: (weight / 1000).toLocaleString('fr-FR', {
                maximumFractionDigits: 2,
            }),
            unit: 'kg',
        };
    }
    return { value: weight.toLocaleString('fr-FR'), unit: 'g' };
}

export {
    clampWeek,
    formatWeight,
    getEquivalenceForWeek,
    getGrowthForWeek,
    getWeightJokeForWeek,
};
