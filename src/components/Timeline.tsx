'use client';

import ItemVisual from '@/components/ItemVisual';
import { cn } from '@/lib/cn';
import { categories } from '@/lib/data';
import { growthForWeek, pregnancyStatus } from '@/lib/pregnancy';
import type { AppState } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface Props {
    state: AppState;
}

export default function Timeline({ state }: Props) {
    const t = useTranslations();
    const { lastPeriodDate, category } = state.pregnancy;
    const status = pregnancyStatus(lastPeriodDate);
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
                <h1 className="text-ink text-xl font-extrabold tracking-tight">
                    {t('timeline.title')}
                </h1>
                <p className="text-ink-soft text-sm">
                    {t('timeline.subtitle', {
                        emoji: cat.emoji,
                        label: cat.label,
                    })}
                </p>
            </header>

            {pastItems.length === 0 && (
                <p className="text-ink-soft rounded-2xl bg-white/60 p-4 text-center text-sm">
                    {t('timeline.empty')}
                </p>
            )}

            <ol className="space-y-2">
                {pastItems.map((item) => {
                    const past = item.week < currentWeek;
                    const current = item.week === currentWeek;
                    const g = growthForWeek(item.week);
                    return (
                        <li
                            key={item.week}
                            className={cn(
                                'flex items-center gap-3 rounded-2xl border-2 p-3 transition',
                                current &&
                                    'border-accent bg-accent/10 shadow-sm',
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
                                size={48}
                                className="shrink-0"
                                emojiClassName="shrink-0 leading-none"
                            />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-accent-deep text-xs font-bold">
                                        S{item.week}
                                    </span>
                                    <span className="text-ink truncate font-semibold">
                                        {item.name}
                                    </span>
                                </div>
                                {g && (
                                    <p className="text-ink-soft text-xs">
                                        {g.size.toLocaleString('fr-FR')} cm ·{' '}
                                        {g.weight >= 1000
                                            ? `${(g.weight / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg`
                                            : `${g.weight} g`}
                                    </p>
                                )}
                            </div>
                            {current && (
                                <span className="bg-accent rounded-full px-2 py-0.5 text-xs font-bold text-white">
                                    ici
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
