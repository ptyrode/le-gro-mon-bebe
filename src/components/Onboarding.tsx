"use client";

import { useState } from "react";
import { categoryList } from "@/lib/data";
import type { CategoryKey } from "@/lib/types";

interface Props {
  onStart: (lastPeriodDate: string, category: CategoryKey) => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Onboarding({ onStart }: Props) {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!lastPeriodDate) {
      setError("Il me faut la date de tes dernières règles 🗓️");
      return;
    }
    if (lastPeriodDate > todayISO()) {
      setError("Cette date est dans le futur, ça coince un peu 😅");
      return;
    }
    if (!category) {
      setError("Choisis une catégorie de comparaison !");
      return;
    }
    onStart(lastPeriodDate, category);
  };

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-10">
      <header className="mb-8 text-center">
        <div className="mb-3 text-6xl">🤰</div>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Lé gro mon bébé
        </h1>
        <p className="mt-2 text-ink-soft">
          Suis la croissance de bébé semaine après semaine, en trucs rigolos.
        </p>
      </header>

      <section className="mb-8">
        <label
          htmlFor="ddr"
          className="mb-2 block text-sm font-semibold text-ink"
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
          className="w-full rounded-2xl border-2 border-cream-deep bg-white px-4 py-3 text-ink shadow-sm outline-none focus:border-accent"
        />
        <p className="mt-2 text-xs text-ink-soft">
          On calcule la semaine de grossesse (SA) à partir de cette date.
        </p>
      </section>

      <section className="mb-8">
        <p className="mb-3 text-sm font-semibold text-ink">
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
                    ? "border-accent bg-accent/10 shadow-sm"
                    : "border-cream-deep bg-white hover:border-accent/50"
                }`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-semibold text-ink">{cat.label}</span>
                <span className="text-xs leading-snug text-ink-soft">
                  {cat.description}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {error && (
        <p className="mb-4 rounded-xl bg-berry/10 px-4 py-2 text-center text-sm font-medium text-berry">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        className="mt-auto w-full rounded-2xl bg-accent px-6 py-4 text-lg font-bold text-white shadow-lg shadow-accent/30 transition active:scale-[0.98] hover:bg-accent-deep"
      >
        C&apos;est parti&nbsp;! 🚀
      </button>
    </main>
  );
}
