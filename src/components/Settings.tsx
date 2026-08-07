"use client";

import { useState } from "react";
import { categoryList } from "@/lib/data";
import type { AppState, CategoryKey } from "@/lib/types";

// TODO(v1.1): remplacer le mailto par l'envoi via Serverless Function + Resend.
const FEEDBACK_EMAIL = "pierrick.tyrode@gmail.com";

interface Props {
  state: AppState;
  onSetCategory: (category: CategoryKey) => void;
  onSetLastPeriodDate: (lastPeriodDate: string) => void;
  onSetNotificationsEnabled: (enabled: boolean) => void;
  onReset: () => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Settings({
  state,
  onSetCategory,
  onSetLastPeriodDate,
  onSetNotificationsEnabled,
  onReset,
}: Props) {
  const { lastPeriodDate, category } = state.pregnancy;
  const notifsEnabled = state.notifications.enabled;
  const [notifMsg, setNotifMsg] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleNotifs = async () => {
    if (notifsEnabled) {
      onSetNotificationsEnabled(false);
      return;
    }
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotifMsg("Ton navigateur ne gère pas les notifications 🤷");
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === "granted") {
      onSetNotificationsEnabled(true);
      setNotifMsg(null);
    } else {
      onSetNotificationsEnabled(false);
      setNotifMsg("Autorisation refusée. Active-les dans les réglages du navigateur.");
    }
  };

  const feedbackHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
    "Idée pour Lé gro mon bébé",
  )}&body=${encodeURIComponent("Mon idée de comparaison :\n\n")}`;

  return (
    <div className="mx-auto w-full max-w-md px-5 pb-28 pt-8">
      <h1 className="mb-6 text-xl font-extrabold tracking-tight text-ink">
        Réglages
      </h1>

      <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
        <label htmlFor="ddr" className="mb-2 block text-sm font-semibold text-ink">
          Date des dernières règles
        </label>
        <input
          id="ddr"
          type="date"
          max={todayISO()}
          value={lastPeriodDate}
          onChange={(e) => {
            if (e.target.value && e.target.value <= todayISO()) {
              onSetLastPeriodDate(e.target.value);
            }
          }}
          className="w-full rounded-2xl border-2 border-cream-deep bg-white px-4 py-3 text-ink outline-none focus:border-accent"
        />
      </section>

      <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-ink">
          Catégorie de comparaison
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

      <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-ink">Notifications</p>
            <p className="text-xs text-ink-soft">
              Un petit rappel quand bébé a grandi.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleNotifs}
            role="switch"
            aria-checked={notifsEnabled}
            className={`relative h-7 w-12 rounded-full transition ${
              notifsEnabled ? "bg-accent" : "bg-cream-deep"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                notifsEnabled ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
        {notifMsg && <p className="mt-3 text-xs text-berry">{notifMsg}</p>}
      </section>

      <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-ink">Une idée de comparaison ?</p>
        <p className="mb-3 text-xs text-ink-soft">
          Poissons rares, fromages qui puent, animaux improbables… propose !
        </p>
        <a
          href={feedbackHref}
          className="inline-block rounded-2xl bg-accent px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent-deep"
        >
          Proposer une idée ✉️
        </a>
      </section>

      <section className="rounded-3xl border-2 border-berry/20 bg-white p-5">
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="text-sm font-semibold text-berry"
          >
            Tout effacer et recommencer
          </button>
        ) : (
          <div>
            <p className="mb-3 text-sm text-ink">
              Sûr ? Toutes les données locales seront effacées.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onReset}
                className="rounded-xl bg-berry px-4 py-2 text-sm font-bold text-white"
              >
                Oui, effacer
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="rounded-xl bg-cream-deep px-4 py-2 text-sm font-semibold text-ink"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
