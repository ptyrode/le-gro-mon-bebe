'use client';

import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { categoryList } from '@/lib/data';
import {
    type NotificationSupport,
    readNotificationPermission,
} from '@/lib/notifications';
import { formatDueDate, validateLastPeriodDate } from '@/lib/pregnancy';
import type { AppState, CategoryKey } from '@/lib/types';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

// TODO(v1.1): remplacer le mailto par l'envoi via Serverless Function + Resend.
const FEEDBACK_EMAIL = 'pierrick.tyrode@gmail.com';
const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/ptyrode';

const noSubscribe = () => () => {};

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
    const t = useTranslations();
    const { lastPeriodDate, category } = state.pregnancy;
    const notifsEnabled = state.notifications.enabled;
    const [notifMsg, setNotifMsg] = useState<string | null>(null);
    const initialPermission = useSyncExternalStore<NotificationSupport>(
        noSubscribe,
        readNotificationPermission,
        () => 'unsupported'
    );
    const [requestedPermission, setRequestedPermission] =
        useState<NotificationSupport | null>(null);
    const permission = requestedPermission ?? initialPermission;
    const notifsActives = notifsEnabled && permission === 'granted';
    const [dateError, setDateError] = useState<string | null>(null);
    const [confirmReset, setConfirmReset] = useState(false);

    const toggleNotifs = async () => {
        if (permission === 'unsupported') {
            setNotifMsg(t('settings.notificationsUnsupported'));
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        if (notifsActives) {
            onSetNotificationsEnabled(false);
            setNotifMsg(null);
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        if (permission === 'denied') {
            setNotifMsg(t('settings.notificationsBlocked'));
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        const perm = await Notification.requestPermission();
        setRequestedPermission(perm);
        onSetNotificationsEnabled(perm === 'granted');
        setNotifMsg(
            perm === 'granted' ? null : t('settings.notificationsDenied')
        );
        track({
            event: 'notifications_toggle',
            enabled: perm === 'granted',
            permission: perm,
        });
    };

    const feedbackHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
        t('settings.feedbackSubject')
    )}&body=${encodeURIComponent(`${t('settings.feedbackMailBody')}\n\n`)}`;

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <h1 className="text-ink mb-6 text-xl font-extrabold tracking-tight">
                {t('settings.title')}
            </h1>
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <label
                    htmlFor="ddr"
                    className="text-ink mb-2 block text-sm font-semibold"
                >
                    {t('settings.dateLabel')}
                </label>
                <input
                    id="ddr"
                    type="date"
                    max={todayISO()}
                    value={lastPeriodDate}
                    onChange={(e) => {
                        const next = e.target.value;
                        const error = validateLastPeriodDate(next);
                        setDateError(error ? t(`dateErrors.${error}`) : null);
                        if (!error) onSetLastPeriodDate(next);
                    }}
                    className="border-cream-deep text-ink focus:border-accent w-full rounded-2xl border-2 bg-white px-4 py-3 outline-none"
                />
                {dateError ? (
                    <p className="text-berry mt-2 text-sm font-medium">
                        {dateError}
                    </p>
                ) : (
                    lastPeriodDate && (
                        <p className="text-ink-soft mt-2 text-sm">
                            {t('dashboard.dueDate', {
                                date: formatDueDate(lastPeriodDate),
                            })}
                        </p>
                    )
                )}
            </section>
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-ink mb-3 text-sm font-semibold">
                    {t('settings.categoryLabel')}
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
                                        source: 'settings',
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
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-ink text-sm font-semibold">
                            {t('settings.notificationsLabel')}
                        </p>
                        <p className="text-ink-soft text-xs">
                            {t('settings.notificationsHint')}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={toggleNotifs}
                        role="switch"
                        aria-checked={notifsActives}
                        className={cn(
                            'relative h-7 w-12 rounded-full transition',
                            notifsActives ? 'bg-accent' : 'bg-cream-deep'
                        )}
                    >
                        <span
                            className={cn(
                                'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all',
                                notifsActives ? 'left-6' : 'left-1'
                            )}
                        />
                    </button>
                </div>
                {notifMsg && (
                    <p className="text-berry mt-3 text-xs">{notifMsg}</p>
                )}
            </section>
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-ink text-sm font-semibold">
                    {t('settings.feedbackTitle')}
                </p>
                <p className="text-ink-soft mb-3 text-xs">
                    {t('settings.feedbackBody')}
                </p>
                <a
                    href={feedbackHref}
                    className="bg-accent hover:bg-accent-deep inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition"
                >
                    <span aria-hidden="true">✉️</span>
                    {t('settings.feedbackCta')}
                </a>
            </section>
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-ink text-sm font-semibold">
                    {t('settings.supportTitle')}
                </p>
                <p className="text-ink-soft mb-3 text-xs">
                    {t('settings.supportBody')}
                </p>
                <a
                    href={BUY_ME_A_COFFEE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track({ event: 'support_click' })}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[#FFDD00] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-95"
                >
                    <span aria-hidden="true">☕</span>
                    {t('settings.supportCta')}
                </a>
            </section>
            <section className="border-berry/20 rounded-3xl border-2 bg-white p-5">
                {!confirmReset ? (
                    <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="text-berry text-sm font-semibold"
                    >
                        {t('settings.resetCta')}
                    </button>
                ) : (
                    <div>
                        <p className="text-ink mb-3 text-sm">
                            {t('settings.resetConfirm')}
                        </p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={onReset}
                                className="bg-berry rounded-xl px-4 py-2 text-sm font-bold text-white"
                            >
                                {t('settings.resetConfirmCta')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setConfirmReset(false)}
                                className="bg-cream-deep text-ink rounded-xl px-4 py-2 text-sm font-semibold"
                            >
                                {t('settings.resetCancel')}
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
