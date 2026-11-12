'use client';

import HomePregnancySwitcher from '@/components/pages/HomePage/HomePregnancySwitcher';
import { getGestationalAge, getReferenceDate } from '@/utils/date';
import { useTranslations } from 'next-intl';

interface HomeHeaderProps {
    state: AppState;
    pregnancy: Pregnancy;
    onSelect: (id: string) => void;
}

export default function HomeHeader({
    state,
    pregnancy,
    onSelect,
}: HomeHeaderProps) {
    const t = useTranslations();
    const age = getGestationalAge(
        pregnancy.lastPeriodDate,
        getReferenceDate(pregnancy)
    );

    return (
        <>
            <header className="mb-6 flex items-baseline justify-between">
                <h1 className="text-ink truncate text-xl font-extrabold tracking-tight">
                    {pregnancy.name.trim() || t('base.name')}
                </h1>
                <span className="text-accent-deep rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">
                    {age.days > 0
                        ? t('common.unit.ageWithDays', {
                              weeks: age.weeks,
                              days: age.days,
                          })
                        : t('common.unit.age', { weeks: age.weeks })}
                </span>
            </header>
            <HomePregnancySwitcher
                state={state}
                pregnancy={pregnancy}
                onSelect={onSelect}
            />
        </>
    );
}
