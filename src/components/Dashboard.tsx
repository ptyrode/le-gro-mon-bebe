'use client';

import { categoryList } from '@/lib/data';
import {
    clampWeek,
    daysUntilDue,
    equivalenceForWeek,
    gestationalAge,
    growthForWeek,
    MAX_WEEK,
    progress,
    rawGestationalWeek,
} from '@/lib/pregnancy';
import { type AppState, type CategoryKey, MEASURE_LABEL } from '@/lib/types';

interface Props {
    state: AppState;
    onSetCategory: (category: CategoryKey) => void;
}

export default function Dashboard({ state, onSetCategory }: Props) {
    const { lastPeriodDate, category } = state.pregnancy;

    const age = gestationalAge(lastPeriodDate);
    const week = clampWeek(rawGestationalWeek(lastPeriodDate));
    const item = equivalenceForWeek(category, week);
    const g = growthForWeek(week);
    const pct = Math.round(progress(lastPeriodDate) * 100);
    const daysLeft = daysUntilDue(lastPeriodDate);
    const born = daysLeft < -7; // marge : on considère né une semaine après le terme

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <header className="mb-6 flex items-baseline justify-between">
                <h1 className="text-ink text-xl font-extrabold tracking-tight">
                    Lé gro mon bébé
                </h1>
                <span className="text-accent-deep rounded-full bg-white px-3 py-1 text-sm font-bold shadow-sm">
                    {age.weeks} SA{age.days > 0 ? ` + ${age.days}j` : ''}
                </span>
            </header>

            <section className="shadow-accent/10 rounded-3xl bg-white p-6 text-center shadow-lg">
                <p className="text-ink-soft text-sm font-medium">
                    {born
                        ? "Cette semaine, bébé faisait la taille d'"
                        : "Cette semaine, bébé fait la taille d'"}
                </p>
                <div className="my-3 text-7xl leading-none">{item.emoji}</div>
                <p className="text-ink text-2xl font-extrabold">{item.name}</p>
                <p className="text-ink-soft mt-3">{item.funText}</p>

                {g && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="bg-cream rounded-2xl p-3">
                            <p className="text-ink-soft text-xs font-medium">
                                Taille
                            </p>
                            <p className="text-ink text-lg font-bold">
                                {g.sizeCm.toLocaleString('fr-FR')} cm
                            </p>
                            <p className="text-ink-soft text-[0.65rem] leading-tight">
                                {MEASURE_LABEL[g.measure]}
                            </p>
                        </div>
                        <div className="bg-cream rounded-2xl p-3">
                            <p className="text-ink-soft text-xs font-medium">
                                Poids
                            </p>
                            <p className="text-ink text-lg font-bold">
                                {g.weightG >= 1000
                                    ? `${(g.weightG / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg`
                                    : `${g.weightG.toLocaleString('fr-FR')} g`}
                            </p>
                        </div>
                    </div>
                )}
            </section>

            <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-ink font-semibold">
                        Semaine {week} / {MAX_WEEK}
                    </span>
                    <span className="text-ink-soft">
                        {born
                            ? 'Bébé est là ! 🎉'
                            : daysLeft > 0
                              ? `J−${daysLeft} avant le terme`
                              : "C'est le grand jour ! 🎉"}
                    </span>
                </div>
                <div className="bg-cream-deep h-3 w-full overflow-hidden rounded-full">
                    <div
                        className="bg-accent h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </section>

            <section className="mt-6">
                <p className="text-ink mb-3 text-sm font-semibold">
                    Comparer en…
                </p>
                <div className="flex flex-wrap gap-2">
                    {categoryList.map((cat) => {
                        const active = cat.key === category;
                        return (
                            <button
                                key={cat.key}
                                type="button"
                                onClick={() => onSetCategory(cat.key)}
                                className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition ${
                                    active
                                        ? 'border-accent bg-accent text-white'
                                        : 'border-cream-deep text-ink hover:border-accent/50 bg-white'
                                }`}
                            >
                                {cat.emoji} {cat.label}
                            </button>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
