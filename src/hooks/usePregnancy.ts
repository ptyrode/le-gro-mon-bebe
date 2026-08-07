'use client';

import { clearState, createState, loadState, saveState } from '@/lib/storage';
import type { AppState, CategoryKey } from '@/lib/types';
import { useCallback, useSyncExternalStore } from 'react';

// --- Store externe adossé au localStorage (pattern useSyncExternalStore) ---

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

// Petit store dédié à la détection d'hydratation (évite le flash onboarding).
const emptySubscribe = () => () => {};

interface UsePregnancy {
    loading: boolean;
    state: AppState | null;
    start: (lastPeriodDate: string, category: CategoryKey) => void;
    setCategory: (category: CategoryKey) => void;
    setLastPeriodDate: (lastPeriodDate: string) => void;
    setNotificationsEnabled: (enabled: boolean) => void;
    setLastSeenWeek: (week: number) => void;
    reset: () => void;
}

export function usePregnancy(): UsePregnancy {
    const state = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot
    );
    // true pendant le SSR + le 1er rendu client, false une fois hydraté.
    const isServer = useSyncExternalStore(
        emptySubscribe,
        () => false,
        () => true
    );

    const start = useCallback(
        (lastPeriodDate: string, category: CategoryKey) => {
            commit(
                createState(lastPeriodDate, category, new Date().toISOString())
            );
        },
        []
    );

    const setCategory = useCallback((category: CategoryKey) => {
        if (!cache) return;
        commit({ ...cache, pregnancy: { ...cache.pregnancy, category } });
    }, []);

    const setLastPeriodDate = useCallback((lastPeriodDate: string) => {
        if (!cache) return;
        commit({ ...cache, pregnancy: { ...cache.pregnancy, lastPeriodDate } });
    }, []);

    const setNotificationsEnabled = useCallback((enabled: boolean) => {
        if (!cache) return;
        commit({
            ...cache,
            notifications: { ...cache.notifications, enabled },
        });
    }, []);

    const setLastSeenWeek = useCallback((week: number) => {
        if (!cache) return;
        commit({
            ...cache,
            notifications: { ...cache.notifications, lastSeenWeek: week },
        });
    }, []);

    const reset = useCallback(() => {
        commit(null);
    }, []);

    return {
        loading: isServer,
        state,
        start,
        setCategory,
        setLastPeriodDate,
        setNotificationsEnabled,
        setLastSeenWeek,
        reset,
    };
}
