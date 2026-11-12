'use client';

import { formatShortDueDate } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export default function usePregnancyLabel(): (
    pregnancy: Pick<Pregnancy, 'name' | 'lastPeriodDate'>
) => string {
    const t = useTranslations();
    return useCallback(
        (pregnancy) =>
            pregnancy.name.trim() ||
            t('common.pregnancy.unnamed', {
                date: formatShortDueDate(pregnancy.lastPeriodDate),
            }),
        [t]
    );
}
