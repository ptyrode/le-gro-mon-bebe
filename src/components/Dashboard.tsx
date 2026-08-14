'use client';

import InstallBanner from '@/components/InstallBanner';
import ItemVisual from '@/components/ItemVisual';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { categoryList } from '@/lib/data';
import {
    daysUntilDue,
    equivalenceForWeek,
    gestationalAge,
    growthForWeek,
    MAX_WEEK,
    MIN_WEEK,
    pregnancyStatus,
    progress,
    weightJokeForWeek,
} from '@/lib/pregnancy';
import type { AppState, CategoryKey } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface Props {
    state: AppState;
    onSetCategory: (category: CategoryKey) => void;
}

function CategoryPicker({
    category,
    onSetCategory,
}: {
    category: CategoryKey;
    onSetCategory: (category: CategoryKey) => void;
}) {
    const t = useTranslations();

    return (
        <section className="mt-6">
            <p className="text-ink mb-3 text-sm font-semibold">
                {t('dashboard.compareIn')}
            </p>
            <div className="flex flex-wrap gap-2">
                {categoryList.map((cat) => {
                    const active = cat.key === category;
                    return (
                        <button
                            key={cat.key}
                            type="button"
                            onClick={() => {
                                track({
                                    event: 'category_change',
                                    category: cat.key,
                                    source: 'dashboard',
                                });
                                onSetCategory(cat.key);
                            }}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-semibold transition',
                                active
                                    ? 'border-accent bg-accent text-white'
                                    : 'border-cream-deep text-ink hover:border-accent/50 bg-white'
                            )}
                        >
                            <span aria-hidden="true">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}

export default function Dashboard({ state, onSetCategory }: Props) {
    const t = useTranslations();
    const { lastPeriodDate, category } = state.pregnancy;
    const status = pregnancyStatus(lastPeriodDate);
    const age = gestationalAge(lastPeriodDate);

    const header = (
        <header className="mb-6 flex items-baseline justify-between">
            <h1 className="text-ink text-xl font-extrabold tracking-tight">
                {t('app.name')}
            </h1>
            <span className="text-accent-deep rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">
                {age.weeks} SA{age.days > 0 ? ` + ${age.days}j` : ''}
            </span>
        </header>
    );

    if (status.kind === 'born') {
        return (
            <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
                {header}
                <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
                    <div className="my-3 text-7xl leading-none">👶</div>
                    <p className="text-ink text-2xl font-extrabold">
                        {t('dashboard.born.title')}
                    </p>
                    <p className="text-ink-soft mt-3">
                        {t('dashboard.born.body', {
                            days: status.daysSinceDue,
                        })}
                    </p>
                    <p className="text-ink-soft mt-4 text-sm">
                        {t('dashboard.born.hint')}
                    </p>
                </section>
            </div>
        );
    }

    if (status.kind === 'future' || status.kind === 'implausible') {
        return (
            <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
                {header}
                <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
                    <div className="my-3 text-7xl leading-none">🤨</div>
                    <p className="text-ink text-2xl font-extrabold">
                        {t('dashboard.oddDate.title')}
                    </p>
                    <p className="text-ink-soft mt-3">
                        {status.kind === 'future'
                            ? t('dashboard.oddDate.future')
                            : t('dashboard.oddDate.implausible')}
                    </p>
                </section>
            </div>
        );
    }

    if (status.kind === 'tooEarly') {
        return (
            <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
                {header}
                <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
                    <div className="my-3 text-7xl leading-none">🌱</div>
                    <p className="text-ink text-2xl font-extrabold">
                        {t('dashboard.tooEarly.title')}
                    </p>
                    <p className="text-ink-soft mt-3">
                        {t('dashboard.tooEarly.body', { week: MIN_WEEK })}
                    </p>
                </section>
                <CategoryPicker
                    category={category}
                    onSetCategory={onSetCategory}
                />
            </div>
        );
    }

    const week = status.week;
    const item = equivalenceForWeek(category, week);
    const g = growthForWeek(week);
    const joke = weightJokeForWeek(week);
    const pct = Math.round(progress(lastPeriodDate) * 100);
    const daysLeft = daysUntilDue(lastPeriodDate);

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            {header}

            <section className="shadow-accent/10 rounded-3xl bg-white p-6 text-center shadow-lg">
                <ItemVisual
                    category={category}
                    item={item}
                    size={160}
                    priority
                    className="mx-auto mb-4"
                    emojiClassName="mb-4 block leading-none"
                />

                {g && (
                    <p className="text-ink text-xl font-extrabold">
                        {t('dashboard.size', {
                            size: g.size.toLocaleString('fr-FR'),
                        })}
                    </p>
                )}
                <p className="text-ink-soft mt-1">
                    {t('dashboard.sizeEquivalent')}
                    {item.wikipedia ? (
                        <a
                            href={item.wikipedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                                track({
                                    event: 'wikipedia_click',
                                    category,
                                    week,
                                    item: item.name,
                                })
                            }
                            className="text-ink decoration-accent hover:text-accent-deep font-bold underline decoration-2 underline-offset-4 transition"
                        >
                            {item.name}
                            <span className="sr-only">
                                {t('dashboard.wikipediaHint')}
                            </span>
                        </a>
                    ) : (
                        <span className="text-ink font-bold">{item.name}</span>
                    )}
                    .
                </p>
                <p className="text-ink-soft mt-3 text-sm italic">
                    {item.funText}
                </p>

                {g && (
                    <div className="border-cream-deep mt-6 border-t pt-5">
                        <p className="text-ink text-xl font-extrabold">
                            {t('dashboard.weight', {
                                weight:
                                    g.weight >= 1000
                                        ? `${(g.weight / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg`
                                        : `${g.weight.toLocaleString('fr-FR')} g`,
                            })}
                        </p>
                        {joke && (
                            <p className="text-ink-soft mt-3 text-sm italic">
                                {joke}
                            </p>
                        )}
                    </div>
                )}
            </section>

            <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-ink font-semibold">
                        {t('dashboard.week', { week, max: MAX_WEEK })}
                    </span>
                    <span className="text-ink-soft">
                        {daysLeft > 0
                            ? t('dashboard.daysLeft', { days: daysLeft })
                            : daysLeft === 0
                              ? t('dashboard.dueToday')
                              : t('dashboard.overdue', { days: -daysLeft })}
                    </span>
                </div>
                <div className="bg-cream-deep h-3 w-full overflow-hidden rounded-full">
                    <div
                        className="bg-accent h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </section>

            <CategoryPicker
                category={category}
                onSetCategory={onSetCategory}
            />

            <InstallBanner />
        </div>
    );
}
