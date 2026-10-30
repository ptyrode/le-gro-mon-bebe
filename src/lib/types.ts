export type MeasureKind = 'lcc' | 'total';

export interface GrowthWeek {
    size: number;
    weight: number;
    measure: MeasureKind;
}

export interface FetalGrowth {
    weeks: Record<string, GrowthWeek>;
}

export interface WeightJokes {
    weeks: Record<string, string>;
}

export interface CategoryItem {
    week: number;
    name: string;
    funText: string;
    wikipedia?: string;
}

export interface Category {
    key: CategoryKey;
    label: string;
    emoji: string;
    description: string;
    items: CategoryItem[];
}

export type CategoryKey =
    'fruits' | 'fish' | 'cheeses' | 'animals' | 'desserts';

export interface PregnancyData {
    lastPeriodDate: string;
    category: CategoryKey;
    createdAt: string;
}

export interface NotificationsState {
    enabled: boolean;
}

export interface AppState {
    version: number;
    pregnancy: PregnancyData;
    notifications: NotificationsState;
}
