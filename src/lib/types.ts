/**
 * Méthode de mesure de la taille.
 * `lcc` = longueur cranio-caudale (bébé recroquevillé), utilisée jusqu'à S13.
 * `total` = tête-talons, à partir de S14. Les deux ne se raccordent pas :
 * d'où le saut de 7 à 12,5 cm entre S13 et S14.
 */
export type MeasureKind = 'lcc' | 'total';

export interface GrowthWeek {
    sizeCm: number;
    weightG: number;
    measure: MeasureKind;
}

export interface FetalGrowth {
    weeks: Record<string, GrowthWeek>;
}

/** Libellé lisible de la méthode de mesure, pour l'affichage. */
export const MEASURE_LABEL: Record<MeasureKind, string> = {
    lcc: 'de la tête aux fesses',
    total: 'de la tête aux pieds',
};

export interface CategoryItem {
    week: number;
    name: string;
    emoji: string;
    funText: string;
}

export interface Category {
    key: CategoryKey;
    label: string;
    emoji: string;
    description: string;
    items: CategoryItem[];
}

export type CategoryKey = 'fruits' | 'fish' | 'cheeses' | 'animals';

export interface PregnancyData {
    /** Date des dernières règles (DDR), format ISO yyyy-mm-dd */
    lastPeriodDate: string;
    category: CategoryKey;
    createdAt: string;
}

export interface NotificationsState {
    enabled: boolean;
    /** Dernière semaine affichée en notif */
    lastSeenWeek: number;
}

export interface AppState {
    version: number;
    pregnancy: PregnancyData;
    notifications: NotificationsState;
}
