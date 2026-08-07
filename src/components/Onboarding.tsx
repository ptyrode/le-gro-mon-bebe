'use client';

import { categoryList } from '@/lib/data';
import type { CategoryKey } from '@/lib/types';
import { useState } from 'react';

interface Props {
    onStart: (lastPeriodDate: string, category: CategoryKey) => void;
}

function todayISO(): string {
    return new Date().toISOString().slice(0, 10);
}

export default function Onboarding({ onStart }: Props) {
    const [lastPeriodDate, setLastPeriodDate] = useState('');
    const [category, setCategory] = useState<CategoryKey | null>(null);
    const [error, setError] = useState<string | null>(null);

    const submit = () => {
        if (!lastPeriodDate) {
            setError('Il me faut la date de tes dernières règles 🗓️');
            return;
        }
        if (lastPeriodDate > todayISO()) {
            setError('Cette date est dans le futur, ça coince un peu 😅');
            return;
        }
        if (!category) {
            setError('Choisis une catégorie de comparaison !');
            return;
        }
        onStart(lastPeriodDate, category);
    };

    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-10">
            <header className="mb-8 text-center">
                <div className="mb-3 text-6xl">🤰</div>
                <h1 className="text-ink text-3xl font-extrabold tracking-tight">
                    Lé gro mon bébé
                </h1>
                <p className="text-ink-soft mt-2">
                    Suis la croissance de bébé semaine après semaine, en trucs
                    rigolos.
                </p>
            </header>

            <section className="mb-8">
                <label
                    htmlFor="ddr"
                    className="text-ink mb-2 block text-sm font-semibold"
                >
                    Date de tes dernières règles
                </label>
                <input
                    id="ddr"
                    type="date"
                    max={todayISO()}
                    value={lastPeriodDate}
                    onChange={(e) => {
                        setLastPeriodDate(e.target.value);
                        setError(null);
                    }}
                    className="border-cream-deep text-ink focus:border-accent w-full rounded-2xl border-2 bg-white px-4 py-3 shadow-sm outline-none"
                />
                <p className="text-ink-soft mt-2 text-xs">
                    On calcule la semaine de grossesse (SA) à partir de cette
                    date.
                </p>
            </section>

            <section className="mb-8">
                <p className="text-ink mb-3 text-sm font-semibold">
                    Bébé, tu le compares en quoi ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                    {categoryList.map((cat) => {
                        const selected = category === cat.key;
                        return (
                            <button
                                key={cat.key}
                                type="button"
                                onClick={() => {
                                    setCategory(cat.key);
                                    setError(null);
                                }}
                                className={`flex flex-col items-start gap-1 rounded-2xl border-2 p-4 text-left transition ${
                                    selected
                                        ? 'border-accent bg-accent/10 shadow-sm'
                                        : 'border-cream-deep hover:border-accent/50 bg-white'
                                }`}
                            >
                                <span className="text-3xl">{cat.emoji}</span>
                                <span className="text-ink font-semibold">
                                    {cat.label}
                                </span>
                                <span className="text-ink-soft text-xs leading-snug">
                                    {cat.description}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {error && (
                <p className="bg-berry/10 text-berry mb-4 rounded-xl px-4 py-2 text-center text-sm font-medium">
                    {error}
                </p>
            )}

            <button
                type="button"
                onClick={submit}
                className="bg-accent shadow-accent/30 hover:bg-accent-deep mt-auto w-full rounded-2xl px-6 py-4 text-lg font-bold text-white shadow-lg transition active:scale-[0.98]"
            >
                C&apos;est parti&nbsp;! 🚀
            </button>
        </main>
    );
}
