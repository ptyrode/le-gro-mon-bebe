type MeasureKind = 'lcc' | 'total';

interface GrowthWeek {
    size: number;
    weight: number;
    measure: MeasureKind;
}

interface FetalGrowth {
    weeks: Record<string, GrowthWeek>;
}

interface WeightJokes {
    weeks: Record<string, string>;
}

interface CategoryItem {
    week: number;
    name: string;
    funText: string;
    wikipedia?: string;
}

interface Category {
    key: CategoryKey;
    label: string;
    emoji: string;
    description: string;
    items: CategoryItem[];
}

type CategoryKey = 'cheeses' | 'fish' | 'animals' | 'desserts' | 'fruits';
