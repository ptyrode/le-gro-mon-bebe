'use client';

import { FEEDBACK_EMAIL } from '@/constants/links';
import { useTranslations } from 'next-intl';

export default function SettingsFeedbackSection() {
    const t = useTranslations();
    const subject = encodeURIComponent(
        t('pages.settings.feedback.mailSubject')
    );
    const body = encodeURIComponent(
        `${t('pages.settings.feedback.mailBody')}\n\n`
    );

    return (
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <p className="text-ink text-sm font-semibold">
                {t('pages.settings.feedback.title')}
            </p>
            <p className="text-ink-soft mb-3 text-xs">
                {t('pages.settings.feedback.body')}
            </p>
            <a
                href={`mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`}
                className="bg-accent hover:bg-accent-deep inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold text-white transition"
            >
                <span aria-hidden="true">✉️</span>
                {t('common.cta.suggestIdea')}
            </a>
        </section>
    );
}
