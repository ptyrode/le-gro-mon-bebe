'use client';

import { MAX_WEEK, MIN_WEEK } from '@/constants/weeks';
import usePregnancy from '@/hooks/usePregnancy';
import usePregnancyLabel from '@/hooks/usePregnancyLabel';
import { disablePush, enablePush } from '@/services/push';
import {
    readNotificationPermission,
    subscribeNotificationPermission,
} from '@/utils/browser';
import { getEquivalenceForWeek } from '@/utils/growth';
import { getOpenPregnancies } from '@/utils/pregnancy';
import { useTranslations } from 'next-intl';
import type { PropsWithChildren } from 'react';
import { useEffect, useSyncExternalStore } from 'react';

type PushSource = Pick<
    Pregnancy,
    'id' | 'name' | 'lastPeriodDate' | 'category'
>;

function usePushSync(loading: boolean, state: AppState | null): void {
    const t = useTranslations();
    const label = usePregnancyLabel();
    const permission = useSyncExternalStore<NotificationSupport>(
        subscribeNotificationPermission,
        readNotificationPermission,
        () => 'unsupported'
    );

    const pushKey =
        state?.notifications.enabled === true
            ? JSON.stringify(
                  getOpenPregnancies(state).map(
                      ({ id, name, lastPeriodDate, category }) => ({
                          id,
                          name,
                          lastPeriodDate,
                          category,
                      })
                  )
              )
            : '';

    useEffect(() => {
        if (loading) return;
        const sources: PushSource[] = pushKey ? JSON.parse(pushKey) : [];
        if (sources.length === 0 || permission !== 'granted') {
            void disablePush();
            return;
        }

        const named = sources.length > 1;
        const pregnancies: PushPregnancy[] = sources.map((source) => {
            const weeks: Record<number, PushText> = {};
            for (let week = MIN_WEEK; week <= MAX_WEEK; week++) {
                weeks[week] = {
                    title: named
                        ? t('messages.growthNotification.titleNamed', {
                              week,
                              name: label(source),
                          })
                        : t('messages.growthNotification.title', { week }),
                    body: getEquivalenceForWeek(source.category, week).funText,
                };
            }
            return {
                id: source.id,
                lastPeriodDate: source.lastPeriodDate,
                weeks,
            };
        });
        void enablePush({ pregnancies });
    }, [loading, pushKey, permission, label, t]);
}

export default function PushSyncProvider({ children }: PropsWithChildren) {
    const { loading, state } = usePregnancy();
    usePushSync(loading, state);

    return children;
}
