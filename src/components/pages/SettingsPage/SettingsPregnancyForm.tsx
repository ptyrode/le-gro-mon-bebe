'use client';

import {
    formatDueDate,
    getTodayISO,
    validateLastPeriodDate,
} from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SettingsPregnancyFormProps {
    pregnancy: Pregnancy;
    onRename: (id: string, name: string) => void;
    onSetLastPeriodDate: (lastPeriodDate: string) => void;
}

export default function SettingsPregnancyForm({
    pregnancy,
    onRename,
    onSetLastPeriodDate,
}: SettingsPregnancyFormProps) {
    const t = useTranslations();
    const [dateError, setDateError] = useState<string | null>(null);
    const { id, name, lastPeriodDate } = pregnancy;

    return (
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <label
                htmlFor="name"
                className="text-ink mb-2 block text-sm font-semibold"
            >
                {t('forms.fields.name.label')}
            </label>
            <input
                id="name"
                type="text"
                maxLength={40}
                value={name}
                placeholder={t('forms.fields.name.placeholder')}
                onChange={(e) => onRename(id, e.target.value)}
                className="border-cream-deep text-ink focus:border-accent placeholder:text-ink-soft/60 mb-5 w-full rounded-2xl border-2 bg-white px-4 py-3 outline-none"
            />
            <label
                htmlFor="ddr"
                className="text-ink mb-2 block text-sm font-semibold"
            >
                {t('forms.fields.lastPeriodDate.settingsLabel')}
            </label>
            <input
                id="ddr"
                type="date"
                max={getTodayISO()}
                value={lastPeriodDate}
                onChange={(e) => {
                    const next = e.target.value;
                    const error = validateLastPeriodDate(next);
                    setDateError(
                        error ? t(`forms.error.lastPeriodDate.${error}`) : null
                    );
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
                        {t('common.pregnancy.dueDate', {
                            date: formatDueDate(lastPeriodDate),
                        })}
                    </p>
                )
            )}
        </section>
    );
}
