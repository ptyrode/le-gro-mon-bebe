'use client';

import { BUY_ME_A_COFFEE_URL } from '@/constants/links';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';

export default function SettingsSupportSection() {
    const t = useTranslations();

    return (
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-ink text-sm font-semibold">
                {t('pages.settings.support.title')}
            </p>
            <p className="text-ink-soft mb-3 text-xs">
                {t('pages.settings.support.body')}
            </p>
            <a
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track({ event: 'support_click' })}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#FFDD00] px-5 py-2.5 text-sm font-bold text-black transition hover:brightness-95"
            >
                <span aria-hidden="true">☕</span>
                {t('common.cta.support')}
            </a>
        </section>
    );
}
