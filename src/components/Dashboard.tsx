'use client';

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
    return (
        <section className="mt-6">
            <p className="text-ink mb-3 text-sm font-semibold">Comparer en…</p>
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
    );
}

export default function Dashboard({ state, onSetCategory }: Props) {
    const { lastPeriodDate, category } = state.pregnancy;
    const status = pregnancyStatus(lastPeriodDate);
    const age = gestationalAge(lastPeriodDate);

    const header = (
        <header className="mb-6 flex items-baseline justify-between">
            <h1 className="text-ink text-xl font-extrabold tracking-tight">
                Lé gro mon bébé
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
                        Bébé devrait être né&nbsp;!
                    </p>
                    <p className="text-ink-soft mt-3">
                        Le terme est dépassé de {status.daysSinceDue} jours.
                        Soit il est déjà là et personne ne me tient au courant,
                        soit il est très bien où il est.
                    </p>
                    <p className="text-ink-soft mt-4 text-sm">
                        Tu peux corriger la date dans les réglages si elle
                        n&apos;est pas la bonne.
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
                        Cette date est bizarre
                    </p>
                    <p className="text-ink-soft mt-3">
                        {status.kind === 'future'
                            ? 'Elle est dans le futur, et ça, même moi je ne sais pas faire.'
                            : 'Elle remonte à plus de deux ans. Un petit tour dans les réglages ?'}
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
                        C&apos;est encore tout frais
                    </p>
                    <p className="text-ink-soft mt-3">
                        À ce stade, bébé est trop petit pour qu&apos;on lui
                        trouve un équivalent. Rendez-vous à la semaine{' '}
                        {MIN_WEEK}&nbsp;!
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
                {/* TODO(illustrations) : remplacer l'emoji par l'image de l'item. */}
                <div className="mb-4 text-7xl leading-none">{item.emoji}</div>

                {g && (
                    <p className="text-ink text-xl font-extrabold">
                        Bébé mesure {g.size.toLocaleString('fr-FR')} cm
                    </p>
                )}
                <p className="text-ink-soft mt-1">
                    Soit la taille d&apos;
                    {item.wikipedia ? (
                        <a
                            href={item.wikipedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ink decoration-accent hover:text-accent-deep font-bold underline decoration-2 underline-offset-4 transition"
                        >
                            {item.name}
                            <span className="sr-only">
                                (article Wikipédia, nouvel onglet)
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
                            Bébé pèse{' '}
                            {g.weight >= 1000
                                ? `${(g.weight / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} kg`
                                : `${g.weight.toLocaleString('fr-FR')} g`}
                        </p>
                        {joke && <p className="text-ink-soft mt-1">{joke}</p>}
                    </div>
                )}
            </section>

            <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-ink font-semibold">
                        Semaine {week} / {MAX_WEEK}
                    </span>
                    <span className="text-ink-soft">
                        {daysLeft > 0
                            ? `J−${daysLeft} avant le terme`
                            : daysLeft === 0
                              ? "C'est le grand jour ! 🎉"
                              : `Terme dépassé de ${-daysLeft} j 🍼`}
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
        </div>
    );
}
