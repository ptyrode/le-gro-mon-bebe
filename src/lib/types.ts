export interface GrowthWeek {
  sizeCm: number;
  weightG: number;
}

export interface FetalGrowth {
  weeks: Record<string, GrowthWeek>;
}

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

export type CategoryKey = "fruits" | "poissons" | "fromages" | "animaux";

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
