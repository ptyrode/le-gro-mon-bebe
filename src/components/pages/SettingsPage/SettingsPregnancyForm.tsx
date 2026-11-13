'use client';

import Card from '@/components/ui/Card';
import Field from '@/components/ui/Field';
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
        <Card className="mb-5">
            <Field
                id="name"
                type="text"
                maxLength={40}
                className="mb-5"
                label={t('forms.fields.name.label')}
                value={name}
                placeholder={t('forms.fields.name.placeholder')}
                onChange={(e) => onRename(id, e.target.value)}
            />
            <Field
                id="ddr"
                type="date"
                max={getTodayISO()}
                label={t('forms.fields.lastPeriodDate.settingsLabel')}
                value={lastPeriodDate}
                error={dateError}
                hint={
                    lastPeriodDate &&
                    t('common.pregnancy.dueDate', {
                        date: formatDueDate(lastPeriodDate),
                    })
                }
                onChange={(e) => {
                    const next = e.target.value;
                    const error = validateLastPeriodDate(next);
                    setDateError(
                        error ? t(`forms.error.lastPeriodDate.${error}`) : null
                    );
                    if (!error) onSetLastPeriodDate(next);
                }}
            />
        </Card>
    );
}
