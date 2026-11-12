'use client';

import usePregnancyLabel from '@/hooks/usePregnancyLabel';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SettingsPregnancyListProps {
    state: AppState;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onClose: (id: string) => void;
    onReopen: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function SettingsPregnancyList({
    state,
    onSelect,
    onAdd,
    onClose,
    onReopen,
    onRemove,
}: SettingsPregnancyListProps) {
    const t = useTranslations();
    const label = usePregnancyLabel();
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
    const actionClass =
        'border-cream-deep text-ink hover:border-accent/50 rounded-full border-2 bg-white px-3 py-1 text-base font-semibold transition';

    return (
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-ink mb-3 text-sm font-semibold">
                {t('pages.settings.pregnancies.title')}
            </p>
            <ul className="mb-4 space-y-2">
                {state.pregnancies.map((p) => {
                    const shown = p.id === state.activeId;
                    return (
                        <li
                            key={p.id}
                            className={cn(
                                'rounded-2xl border-2 p-3',
                                shown
                                    ? 'border-accent bg-accent/10'
                                    : 'border-cream-deep'
                            )}
                        >
                            <div className="flex items-baseline justify-between gap-2">
                                <span className="text-ink truncate font-semibold">
                                    {label(p)}
                                </span>
                                <span className="text-ink-soft shrink-0 text-xs font-semibold">
                                    {shown
                                        ? t('pages.settings.pregnancies.shown')
                                        : p.closedAt
                                          ? t(
                                                'pages.settings.pregnancies.closed'
                                            )
                                          : null}
                                </span>
                            </div>
                            {confirmDeleteId === p.id ? (
                                <div className="mt-2">
                                    <p className="text-ink mb-2 text-xs">
                                        {t(
                                            'pages.settings.pregnancies.deleteConfirm'
                                        )}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setConfirmDeleteId(null);
                                                onRemove(p.id);
                                            }}
                                            className="bg-berry rounded-xl px-3 py-1.5 text-base font-bold text-white"
                                        >
                                            {t('common.cta.delete')}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setConfirmDeleteId(null)
                                            }
                                            className="bg-cream-deep text-ink rounded-xl px-3 py-1.5 text-base font-semibold"
                                        >
                                            {t('common.cta.cancel')}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {!shown && (
                                        <button
                                            type="button"
                                            onClick={() => onSelect(p.id)}
                                            className={actionClass}
                                        >
                                            {t('common.cta.edit')}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            p.closedAt
                                                ? onReopen(p.id)
                                                : onClose(p.id)
                                        }
                                        className={actionClass}
                                    >
                                        {p.closedAt
                                            ? t('common.cta.reopen')
                                            : t('common.cta.close')}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setConfirmDeleteId(p.id);
                                        }}
                                        className={cn(
                                            actionClass,
                                            'text-berry'
                                        )}
                                    >
                                        {t('common.cta.delete')}
                                    </button>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <button
                type="button"
                onClick={onAdd}
                className="bg-accent hover:bg-accent-deep inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-base font-bold text-white transition"
            >
                <span aria-hidden="true">➕</span>
                {t('common.cta.addPregnancy')}
            </button>
        </section>
    );
}
