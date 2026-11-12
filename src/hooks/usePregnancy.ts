'use client';

import {
    createPregnancy,
    createState,
    getOpenPregnancies,
} from '@/utils/pregnancy';
import { clearState, loadState, saveState } from '@/utils/storage';
import { useCallback, useSyncExternalStore } from 'react';

function getActivePregnancy(state: AppState): Pregnancy {
    return (
        state.pregnancies.find((p) => p.id === state.activeId) ??
        state.pregnancies[0]
    );
}

function removePregnancy(state: AppState, id: string): AppState | null {
    const pregnancies = state.pregnancies.filter((p) => p.id !== id);
    if (pregnancies.length === 0) return null;
    if (pregnancies.some((p) => p.id === state.activeId)) {
        return { ...state, pregnancies };
    }
    const fallback = pregnancies.find((p) => !p.closedAt) ?? pregnancies[0];
    return { ...state, pregnancies, activeId: fallback.id };
}

function patchPregnancy(
    state: AppState,
    id: string,
    patch: Partial<Omit<Pregnancy, 'id'>>
): AppState {
    return {
        ...state,
        pregnancies: state.pregnancies.map((p) =>
            p.id === id ? { ...p, ...patch } : p
        ),
    };
}

function closePregnancy(
    state: AppState,
    id: string,
    closedAtISO: string
): AppState {
    const next = patchPregnancy(state, id, { closedAt: closedAtISO });
    if (state.activeId !== id) return next;
    const stillOpen = getOpenPregnancies(next)[0];
    return stillOpen ? { ...next, activeId: stillOpen.id } : next;
}

let cache: AppState | null = null;

let loaded = false;

const listeners = new Set<() => void>();

function getSnapshot(): AppState | null {
    if (!loaded) {
        cache = loadState();
        loaded = true;
    }
    return cache;
}

function getServerSnapshot(): AppState | null {
    return null;
}

function subscribe(cb: () => void): () => void {
    listeners.add(cb);
    return () => {
        listeners.delete(cb);
    };
}

function commit(next: AppState | null): void {
    cache = next;
    loaded = true;
    if (next) saveState(next);
    else clearState();
    listeners.forEach((l) => l());
}

function update(fn: (state: AppState) => AppState | null): void {
    if (!cache) return;
    commit(fn(cache));
}

const emptySubscribe = () => () => {};

interface UsePregnancy {
    loading: boolean;
    state: AppState | null;
    active: Pregnancy | null;
    start: (
        lastPeriodDate: string,
        category: CategoryKey,
        name: string
    ) => void;
    select: (id: string) => void;
    setCategory: (category: CategoryKey) => void;
    setLastPeriodDate: (lastPeriodDate: string) => void;
    rename: (id: string, name: string) => void;
    close: (id: string) => void;
    reopen: (id: string) => void;
    remove: (id: string) => void;
    setNotificationsEnabled: (enabled: boolean) => void;
    reset: () => void;
}

export default function usePregnancy(): UsePregnancy {
    const state = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );
    const isServer = useSyncExternalStore(
        emptySubscribe,
        () => false,
        () => true
    );

    const start = useCallback(
        (lastPeriodDate: string, category: CategoryKey, name: string) => {
            const pregnancy = createPregnancy(
                lastPeriodDate,
                category,
                name,
                new Date().toISOString()
            );
            commit(
                cache
                    ? {
                          ...cache,
                          pregnancies: [...cache.pregnancies, pregnancy],
                          activeId: pregnancy.id,
                      }
                    : createState(pregnancy)
            );
        },
        []
    );

    const select = useCallback((id: string) => {
        update((s) => ({ ...s, activeId: id }));
    }, []);

    const setCategory = useCallback((category: CategoryKey) => {
        update((s) => patchPregnancy(s, s.activeId, { category }));
    }, []);

    const setLastPeriodDate = useCallback((lastPeriodDate: string) => {
        update((s) => patchPregnancy(s, s.activeId, { lastPeriodDate }));
    }, []);

    const rename = useCallback((id: string, name: string) => {
        update((s) => patchPregnancy(s, id, { name }));
    }, []);

    const close = useCallback((id: string) => {
        update((s) => closePregnancy(s, id, new Date().toISOString()));
    }, []);

    const reopen = useCallback((id: string) => {
        update((s) => patchPregnancy(s, id, { closedAt: undefined }));
    }, []);

    const remove = useCallback((id: string) => {
        update((s) => removePregnancy(s, id));
    }, []);

    const setNotificationsEnabled = useCallback((enabled: boolean) => {
        update((s) => ({
            ...s,
            notifications: { ...s.notifications, enabled },
        }));
    }, []);

    const reset = useCallback(() => {
        commit(null);
    }, []);

    return {
        loading: isServer,
        state,
        active: state ? getActivePregnancy(state) : null,
        start,
        select,
        setCategory,
        setLastPeriodDate,
        rename,
        close,
        reopen,
        remove,
        setNotificationsEnabled,
        reset,
    };
}
