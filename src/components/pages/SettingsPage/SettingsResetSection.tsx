'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SettingsResetSectionProps {
    onReset: () => void;
}

export default function SettingsResetSection({
    onReset,
}: SettingsResetSectionProps) {
    const t = useTranslations();
    const [confirming, setConfirming] = useState(false);

    return (
        <section className="border-berry/20 rounded-3xl border-2 bg-white p-5">
            {!confirming ? (
                <button
                    type="button"
                    onClick={() => setConfirming(true)}
                    className="text-berry text-base font-semibold"
                >
                    {t('common.cta.reset')}
                </button>
            ) : (
                <div>
                    <p className="text-ink mb-3 text-sm">
                        {t('pages.settings.reset.confirm')}
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={onReset}
                            className="bg-berry rounded-xl px-4 py-2 text-base font-bold text-white"
                        >
                            {t('common.cta.confirmReset')}
                        </button>
                        <button
                            type="button"
                            onClick={() => setConfirming(false)}
                            className="bg-cream-deep text-ink rounded-xl px-4 py-2 text-base font-semibold"
                        >
                            {t('common.cta.cancel')}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
