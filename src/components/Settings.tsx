'use client';

import { categoryList } from '@/lib/data';
import { validateLastPeriodDate } from '@/lib/pregnancy';
import type { AppState, CategoryKey } from '@/lib/types';
import { useState } from 'react';

// TODO(v1.1): remplacer le mailto par l'envoi via Serverless Function + Resend.
const FEEDBACK_EMAIL = 'pierrick.tyrode@gmail.com';

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
    const [dateError, setDateError] = useState<string | null>(null);
    const [confirmReset, setConfirmReset] = useState(false);

    const toggleNotifs = async () => {
        if (notifsEnabled) {
            onSetNotificationsEnabled(false);
            return;
        }
        if (typeof window === 'undefined' || !('Notification' in window)) {
            setNotifMsg('Ton navigateur ne gère pas les notifications 🤷');
            return;
        }
        const perm = await Notification.requestPermission();
        if (perm === 'granted') {
            onSetNotificationsEnabled(true);
            setNotifMsg(null);
        } else {
            onSetNotificationsEnabled(false);
            setNotifMsg(
                'Autorisation refusée. Active-les dans les réglages du navigateur.'
            );
        }
    };

    const feedbackHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
        'Idée pour Lé gro mon bébé'
    )}&body=${encodeURIComponent('Mon idée de comparaison :\n\n')}`;

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <h1 className="text-ink mb-6 text-xl font-extrabold tracking-tight">
                Réglages
            </h1>

            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <label
                    htmlFor="ddr"
                    className="text-ink mb-2 block text-sm font-semibold"
                >
                    Date des dernières règles
                </label>
                <input
                    id="ddr"
                    type="date"
                    max={todayISO()}
                    value={lastPeriodDate}
                    onChange={(e) => {
                        const next = e.target.value;
                        const error = validateLastPeriodDate(next);
                        setDateError(error);
                        if (!error) onSetLastPeriodDate(next);
                    }}
                    className="border-cream-deep text-ink focus:border-accent w-full rounded-2xl border-2 bg-white px-4 py-3 outline-none"
                />
                {dateError && (
                    <p className="text-berry mt-2 text-sm font-medium">
                        {dateError}
                    </p>
                )}
            </section>

            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-ink mb-3 text-sm font-semibold">
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

            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-ink text-sm font-semibold">
                            Notifications
                        </p>
                        <p className="text-ink-soft text-xs">
                            Un petit rappel quand bébé a grandi.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={toggleNotifs}
                        role="switch"
                        aria-checked={notifsEnabled}
                        className={`relative h-7 w-12 rounded-full transition ${
                            notifsEnabled ? 'bg-accent' : 'bg-cream-deep'
                        }`}
                    >
                        <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                                notifsEnabled ? 'left-6' : 'left-1'
                            }`}
                        />
                    </button>
                </div>
                {notifMsg && (
                    <p className="text-berry mt-3 text-xs">{notifMsg}</p>
                )}
            </section>

            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-ink text-sm font-semibold">
                    Une idée de comparaison ?
                </p>
                <p className="text-ink-soft mb-3 text-xs">
                    Poissons rares, fromages qui puent, animaux improbables…
                    propose !
                </p>
                <a
                    href={feedbackHref}
                    className="bg-accent hover:bg-accent-deep inline-block rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition"
                >
                    Proposer une idée ✉️
                </a>
            </section>

            <section className="border-berry/20 rounded-3xl border-2 bg-white p-5">
                {!confirmReset ? (
                    <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="text-berry text-sm font-semibold"
                    >
                        Tout effacer et recommencer
                    </button>
                ) : (
                    <div>
                        <p className="text-ink mb-3 text-sm">
                            Sûr ? Toutes les données locales seront effacées.
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onReset}
                                className="bg-berry rounded-xl px-4 py-2 text-sm font-bold text-white"
                            >
                                Oui, effacer
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmReset(false)}
                                className="bg-cream-deep text-ink rounded-xl px-4 py-2 text-sm font-semibold"
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
