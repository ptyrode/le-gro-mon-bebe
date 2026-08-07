"use client";

import { categoryList } from "@/lib/data";
import {
  MAX_WEEK,
  clampWeek,
  daysUntilDue,
  equivalenceForWeek,
  gestationalAge,
  growthForWeek,
  progress,
  rawGestationalWeek,
} from "@/lib/pregnancy";
import type { AppState, CategoryKey } from "@/lib/types";

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
    <div className="mx-auto w-full max-w-md px-5 pb-28 pt-8">
      <header className="mb-6 flex items-baseline justify-between">
        <h1 className="text-xl font-extrabold tracking-tight text-ink">
          Lé gro mon bébé
        </h1>
        <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-accent-deep shadow-sm">
          {age.weeks} SA{age.days > 0 ? ` + ${age.days}j` : ""}
        </span>
      </header>

      <section className="rounded-3xl bg-white p-6 text-center shadow-lg shadow-accent/10">
        <p className="text-sm font-medium text-ink-soft">
          {born ? "Cette semaine, bébé faisait la taille d'" : "Cette semaine, bébé fait la taille d'"}
        </p>
        <div className="my-3 text-7xl leading-none">{item.emoji}</div>
        <p className="text-2xl font-extrabold text-ink">{item.name}</p>
        <p className="mt-3 text-ink-soft">{item.funText}</p>

        {g && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cream p-3">
              <p className="text-xs font-medium text-ink-soft">Taille</p>
              <p className="text-lg font-bold text-ink">
                {g.sizeCm.toLocaleString("fr-FR")} cm
              </p>
            </div>
            <div className="rounded-2xl bg-cream p-3">
              <p className="text-xs font-medium text-ink-soft">Poids</p>
              <p className="text-lg font-bold text-ink">
                {g.weightG >= 1000
                  ? `${(g.weightG / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg`
                  : `${g.weightG.toLocaleString("fr-FR")} g`}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-ink">
            Semaine {week} / {MAX_WEEK}
          </span>
          <span className="text-ink-soft">
            {born
              ? "Bébé est là ! 🎉"
              : daysLeft > 0
                ? `J−${daysLeft} avant le terme`
                : "C'est le grand jour ! 🎉"}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-cream-deep">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </section>

      <section className="mt-6">
        <p className="mb-3 text-sm font-semibold text-ink">Comparer en…</p>
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
                    ? "border-accent bg-accent text-white"
                    : "border-cream-deep bg-white text-ink hover:border-accent/50"
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
