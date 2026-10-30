'use client';

import BottomNav, { type View } from '@/components/BottomNav';
import Dashboard from '@/components/Dashboard';
import Onboarding from '@/components/Onboarding';
import Settings from '@/components/Settings';
import Timeline from '@/components/Timeline';
import { usePregnancy } from '@/hooks/usePregnancy';
import { track } from '@/lib/analytics';
import { readNotificationPermission } from '@/lib/notifications';
import { equivalenceForWeek, MAX_WEEK, MIN_WEEK } from '@/lib/pregnancy';
import { disablePush, enablePush, type PushText } from '@/lib/push';
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
        reset,
    } = usePregnancy();
    const [view, setView] = useState<View>('dashboard');
    const t = useTranslations();

    const lastPeriodDate = state?.pregnancy.lastPeriodDate;
    const category = state?.pregnancy.category;
    const notificationsEnabled = state?.notifications.enabled;

    useEffect(() => {
        if (loading) return;
        if (
            !lastPeriodDate ||
            !category ||
            !notificationsEnabled ||
            readNotificationPermission() !== 'granted'
        ) {
            void disablePush();
            return;
        }

        const weeks: Record<number, PushText> = {};
        for (let week = MIN_WEEK; week <= MAX_WEEK; week++) {
            weeks[week] = {
                title: t('notification.title', { week }),
                body: equivalenceForWeek(category, week).funText,
            };
        }
        void enablePush({ lastPeriodDate, weeks });
    }, [loading, lastPeriodDate, category, notificationsEnabled, t]);

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
