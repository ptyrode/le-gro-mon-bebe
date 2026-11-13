'use client';

import HomePregnancySwitcher from '@/components/pages/HomePage/HomePregnancySwitcher';
import Badge from '@/components/ui/Badge';
import Text from '@/components/ui/Text';
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
                <Text
                    as="h1"
                    variant="title"
                    className="truncate"
                >
                    {pregnancy.name.trim() || t('base.name')}
                </Text>
                <Badge variant="secondary">
                    {age.days > 0
                        ? t('common.unit.ageWithDays', {
                              weeks: age.weeks,
                              days: age.days,
                          })
                        : t('common.unit.age', { weeks: age.weeks })}
                </Badge>
            </header>
            <HomePregnancySwitcher
                state={state}
                pregnancy={pregnancy}
                onSelect={onSelect}
            />
        </>
    );
}
