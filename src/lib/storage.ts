import type { AppState, CategoryKey } from '@/lib/types';

const STORAGE_KEY = 'lgmb:v1';
export const STATE_VERSION = 1;

/** Lit l'état depuis le localStorage. Renvoie null si absent/invalide. */
export function loadState(): AppState | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as AppState;
        if (!parsed?.pregnancy?.lastPeriodDate) return null;
        return parsed;
    } catch {
        return null;
    }
}

/** Écrit l'état dans le localStorage. */
export function saveState(state: AppState): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/** Efface toutes les données de l'appli. */
export function clearState(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
}

/** Construit un état initial à partir d'une DDR et d'une catégorie. */
export function createState(
    lastPeriodDate: string,
    category: CategoryKey,
    createdAtISO: string
): AppState {
    return {
        version: STATE_VERSION,
        pregnancy: { lastPeriodDate, category, createdAt: createdAtISO },
        notifications: { enabled: false, lastSeenWeek: 0 },
    };
}
