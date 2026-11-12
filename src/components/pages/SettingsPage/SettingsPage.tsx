'use client';

import CategoryPicker from '@/components/common/CategoryPicker';
import SettingsFeedbackSection from '@/components/pages/SettingsPage/SettingsFeedbackSection';
import SettingsNotificationsSection from '@/components/pages/SettingsPage/SettingsNotificationsSection';
import SettingsPregnancyForm from '@/components/pages/SettingsPage/SettingsPregnancyForm';
import SettingsPregnancyList from '@/components/pages/SettingsPage/SettingsPregnancyList';
import SettingsResetSection from '@/components/pages/SettingsPage/SettingsResetSection';
import SettingsSupportSection from '@/components/pages/SettingsPage/SettingsSupportSection';
import { ROUTE_NEW_PREGNANCY } from '@/constants/routes';
import usePregnancy from '@/hooks/usePregnancy';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
    const t = useTranslations();
    const router = useRouter();
    const {
        state,
        active,
        select,
        close,
        reopen,
        remove,
        rename,
        setCategory,
        setLastPeriodDate,
        setNotificationsEnabled,
        reset,
    } = usePregnancy();

    if (!state || !active) return null;

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <h1 className="text-ink mb-6 text-xl font-extrabold tracking-tight">
                {t('pages.settings.title')}
            </h1>
            <SettingsPregnancyList
                state={state}
                onSelect={select}
                onAdd={() => router.push(ROUTE_NEW_PREGNANCY)}
                onClose={close}
                onReopen={reopen}
                onRemove={remove}
            />
            <SettingsPregnancyForm
                key={active.id}
                pregnancy={active}
                onRename={rename}
                onSetLastPeriodDate={setLastPeriodDate}
            />
            <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
                <CategoryPicker
                    label={t('forms.fields.category.settingsLabel')}
                    source="settings"
                    category={active.category}
                    onSetCategory={setCategory}
                />
            </section>
            <SettingsNotificationsSection
                enabled={state.notifications.enabled}
                onSetEnabled={setNotificationsEnabled}
            />
            <SettingsFeedbackSection />
            <SettingsSupportSection />
            <SettingsResetSection onReset={reset} />
        </div>
    );
}
