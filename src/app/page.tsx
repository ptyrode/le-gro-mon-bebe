'use client';

import BottomNav, { type View } from '@/components/BottomNav';
import Dashboard from '@/components/Dashboard';
import Onboarding from '@/components/Onboarding';
import Settings from '@/components/Settings';
import Timeline from '@/components/Timeline';
import { usePregnancy } from '@/hooks/usePregnancy';
import { track } from '@/lib/analytics';
import { categories } from '@/lib/data';
import { showNotification } from '@/lib/notifications';
import { equivalenceForWeek, pregnancyStatus } from '@/lib/pregnancy';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Home() {
    const {
        loading,
        state,
        start,
        setCategory,
        setLastPeriodDate,
        setNotificationsEnabled,
        setLastSeenWeek,
        reset,
    } = usePregnancy();
    const [view, setView] = useState<View>('dashboard');
    const t = useTranslations();

    useEffect(() => {
        if (!state || !state.notifications.enabled) return;
        if (
            typeof window !== 'undefined' &&
            'Notification' in window &&
            Notification.permission === 'denied'
        ) {
            setNotificationsEnabled(false);
            return;
        }
        if (typeof window === 'undefined' || !('Notification' in window))
            return;
        if (Notification.permission !== 'granted') return;

        const status = pregnancyStatus(state.pregnancy.lastPeriodDate);
        if (status.kind !== 'ongoing') return;

        const week = status.week;
        if (week <= state.notifications.lastSeenWeek) return;

        const item = equivalenceForWeek(state.pregnancy.category, week);
        setLastSeenWeek(week);
        void showNotification(t('notification.title'), {
            body: t('notification.body', {
                week,
                name: item.name,
                emoji: categories[state.pregnancy.category].emoji,
            }),
            icon: '/icon-192.png',
            badge: '/icon-192.png',
        });
    }, [state, setLastSeenWeek, setNotificationsEnabled, t]);

    if (loading) {
        return (
            <div className="flex min-h-dvh items-center justify-center text-4xl">
                🍼
            </div>
        );
    }

    if (!state) {
        return (
            <Onboarding
                onStart={(lastPeriodDate, category) => {
                    setView('dashboard');
                    start(lastPeriodDate, category);
                }}
            />
        );
    }

    return (
        <>
            {view === 'dashboard' && (
                <Dashboard
                    state={state}
                    onSetCategory={setCategory}
                />
            )}
            {view === 'timeline' && <Timeline state={state} />}
            {view === 'settings' && (
                <Settings
                    state={state}
                    onSetCategory={setCategory}
                    onSetLastPeriodDate={setLastPeriodDate}
                    onSetNotificationsEnabled={setNotificationsEnabled}
                    onReset={() => {
                        setView('dashboard');
                        reset();
                    }}
                />
            )}
            <BottomNav
                view={view}
                onChange={(next) => {
                    track({ event: 'view_change', view: next });
                    setView(next);
                }}
            />
        </>
    );
}
