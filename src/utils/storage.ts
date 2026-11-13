import { INSTALL_DISMISS_KEY } from '@/constants/install';
import { LEGACY_STORAGE_KEY, STORAGE_KEY } from '@/constants/storage';
import { createPregnancy, createState } from '@/utils/pregnancy';

interface LegacyState {
    pregnancy?: {
        lastPeriodDate?: string;
        category?: CategoryKey;
        createdAt?: string;
    };
    notifications?: NotificationsState;
}

function isValidState(value: unknown): value is AppState {
    const state = value as Partial<AppState> | null;
    return (
        Array.isArray(state?.pregnancies) &&
        state.pregnancies.length > 0 &&
        state.pregnancies.every((p) => Boolean(p?.id && p.lastPeriodDate)) &&
        typeof state.activeId === 'string'
    );
}

function migrateLegacy(legacy: LegacyState): AppState | null {
    const pregnancy = legacy.pregnancy;
    if (!pregnancy?.lastPeriodDate || !pregnancy.category) return null;
    return createState(
        createPregnancy(
            pregnancy.lastPeriodDate,
            pregnancy.category,
            '',
            pregnancy.createdAt ?? new Date().toISOString()
        ),
        legacy.notifications?.enabled ?? true
    );
}

function loadState(): AppState | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed: unknown = JSON.parse(raw);
            return isValidState(parsed) ? parsed : null;
        }
        const legacyRaw = window.localStorage.getItem(LEGACY_STORAGE_KEY);
        if (!legacyRaw) return null;
        const migrated = migrateLegacy(JSON.parse(legacyRaw) as LegacyState);
        if (migrated) {
            saveState(migrated);
            window.localStorage.removeItem(LEGACY_STORAGE_KEY);
        }
        return migrated;
    } catch {
        return null;
    }
}

function saveState(state: AppState): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    window.localStorage.removeItem(INSTALL_DISMISS_KEY);
}

export { clearState, loadState, saveState };
