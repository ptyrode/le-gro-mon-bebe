'use client';

import InAppBrowserBanner from '@/components/common/InAppBrowserBanner';
import Button from '@/components/ui/Button';
import Field from '@/components/ui/Field';
import SelectableCard from '@/components/ui/SelectableCard';
import Text from '@/components/ui/Text';
import { categoryList } from '@/constants/data';
import { ICONS } from '@/constants/icons';
import {
    readNotificationPermission,
    requestNotificationPermission,
} from '@/utils/browser';
import { cn } from '@/utils/cn';
import { getTodayISO, validateLastPeriodDate } from '@/utils/date';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface OnboardingProps {
    onStart: (
        lastPeriodDate: string,
        category: CategoryKey,
        name: string
    ) => void;
    onCancel?: () => void;
}

export default function Onboarding({ onStart, onCancel }: OnboardingProps) {
    const t = useTranslations();
    const adding = Boolean(onCancel);
    const [name, setName] = useState('');
    const [lastPeriodDate, setLastPeriodDate] = useState('');
    const [category, setCategory] = useState<CategoryKey | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [categoryError, setCategoryError] = useState<string | null>(null);

    const submit = () => {
        const dateErrorKey = validateLastPeriodDate(lastPeriodDate);
        setDateError(
            dateErrorKey
                ? t(`forms.error.lastPeriodDate.${dateErrorKey}`)
                : null
        );
        setCategoryError(category ? null : t('forms.error.category'));
        if (dateErrorKey || !category) return;
        onStart(lastPeriodDate, category, name.trim());
        if (readNotificationPermission() === 'default') {
            void requestNotificationPermission();
        }
    };

    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-10">
            <header className="mb-8 text-center">
                <div className="mb-3 text-6xl">{ICONS.pregnancy}</div>
                <Text
                    as="h1"
                    variant="display"
                >
                    {adding ? t('pages.newPregnancy.title') : t('base.name')}
                </Text>
                <Text className="mt-2">
                    {adding
                        ? t('pages.newPregnancy.tagline')
                        : t('common.onboarding.tagline')}
                </Text>
            </header>
            <InAppBrowserBanner className="mb-8" />
            <Field
                id="name"
                type="text"
                maxLength={40}
                className="mb-8"
                label={t('forms.fields.name.labelOptional')}
                value={name}
                placeholder={t('forms.fields.name.placeholder')}
                onChange={(e) => setName(e.target.value)}
            />
            <Field
                id="ddr"
                type="date"
                max={getTodayISO()}
                className="mb-8"
                label={t('forms.fields.lastPeriodDate.label')}
                hint={t('forms.fields.lastPeriodDate.hint')}
                error={dateError}
                value={lastPeriodDate}
                onChange={(e) => {
                    setLastPeriodDate(e.target.value);
                    setDateError(null);
                }}
            />
            <section className="mb-8">
                <Text
                    variant="label"
                    className="mb-3"
                >
                    {t('forms.fields.category.label')}
                </Text>
                <div className="grid grid-cols-2 gap-3">
                    {categoryList.map((cat) => (
                        <SelectableCard
                            key={cat.key}
                            selected={category === cat.key}
                            className="p-4"
                            onSelect={() => {
                                setCategory(cat.key);
                                setCategoryError(null);
                            }}
                        >
                            <span className="flex flex-col items-start gap-1">
                                <span
                                    aria-hidden="true"
                                    className="text-3xl"
                                >
                                    {cat.emoji}
                                </span>
                                <span className="text-chocolate font-semibold">
                                    {cat.label}
                                </span>
                                <Text
                                    as="span"
                                    variant="hint"
                                >
                                    {cat.description}
                                </Text>
                            </span>
                        </SelectableCard>
                    ))}
                </div>
                {categoryError && (
                    <Text
                        variant="error"
                        className="mt-2"
                    >
                        {categoryError}
                    </Text>
                )}
            </section>
            <div className="mt-auto flex gap-2">
                {onCancel && (
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                    >
                        {t('common.cta.cancel')}
                    </Button>
                )}
                <Button
                    icon={ICONS.start}
                    className={cn(!onCancel && 'w-full')}
                    onClick={submit}
                >
                    {t('common.cta.start')}
                </Button>
            </div>
        </main>
    );
}
