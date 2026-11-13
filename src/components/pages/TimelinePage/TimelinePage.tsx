'use client';

import ItemVisual from '@/components/common/ItemVisual';
import Badge from '@/components/ui/Badge';
import Text from '@/components/ui/Text';
import { categories } from '@/constants/data';
import usePregnancy from '@/hooks/usePregnancy';
import { cn } from '@/utils/cn';
import { getReferenceDate } from '@/utils/date';
import { formatWeight, getGrowthForWeek } from '@/utils/growth';
import { getPregnancyStatus } from '@/utils/pregnancy';
import { useTranslations } from 'next-intl';

export default function TimelinePage() {
    const t = useTranslations();
    const { active: pregnancy } = usePregnancy();

    if (!pregnancy) return null;

    const { lastPeriodDate, category } = pregnancy;
    const status = getPregnancyStatus(
        lastPeriodDate,
        getReferenceDate(pregnancy)
    );
    const cat = categories[category];
    const currentWeek = status.kind === 'ongoing' ? status.week : 0;
    const pastItems =
        status.kind === 'born'
            ? cat.items
            : status.kind === 'ongoing'
              ? cat.items.filter((item) => item.week <= currentWeek)
              : [];

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <header className="mb-6">
                <Text
                    as="h1"
                    variant="title"
                >
                    {t('pages.timeline.title')}
                </Text>
                <Text variant="caption">
                    {t('pages.timeline.subtitle', {
                        emoji: cat.emoji,
                        label: cat.label,
                    })}
                </Text>
            </header>
            {pastItems.length === 0 && (
                <Text
                    variant="caption"
                    className="rounded-xl bg-white/60 p-4 text-center"
                >
                    {t('pages.timeline.empty')}
                </Text>
            )}
            <ol className="space-y-2">
                {pastItems.map((item) => {
                    const past = item.week < currentWeek;
                    const current = item.week === currentWeek;
                    const g = getGrowthForWeek(item.week);
                    return (
                        <li
                            key={item.week}
                            className={cn(
                                'flex items-center gap-3 rounded-xl border-2 p-3 transition',
                                current && 'border-coral bg-coral/10 shadow-sm',
                                !current &&
                                    past &&
                                    'border-transparent bg-white/60 opacity-70',
                                !current &&
                                    !past &&
                                    'border-transparent bg-white'
                            )}
                        >
                            <ItemVisual
                                category={category}
                                item={item}
                                size="sm"
                                className="shrink-0"
                                emojiClassName="shrink-0 leading-none"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-terracotta text-xs font-bold">
                                        {t('common.unit.week', {
                                            week: item.week,
                                        })}
                                    </span>
                                    <span className="text-chocolate truncate font-semibold">
                                        {item.name}
                                    </span>
                                </div>
                                {g && (
                                    <Text variant="hint">
                                        {t('pages.timeline.measures', {
                                            size: g.size.toLocaleString(
                                                'fr-FR'
                                            ),
                                            weight: t(
                                                `common.unit.${formatWeight(g.weight).unit}`,
                                                formatWeight(g.weight)
                                            ),
                                        })}
                                    </Text>
                                )}
                            </div>
                            {current && (
                                <Badge>{t('pages.timeline.current')}</Badge>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
