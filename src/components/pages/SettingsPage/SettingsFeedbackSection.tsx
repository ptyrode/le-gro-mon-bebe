'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ICONS } from '@/constants/icons';
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
        <Card
            className="mb-5"
            title={t('pages.settings.feedback.title')}
            hint={t('pages.settings.feedback.body')}
        >
            <Button
                href={`mailto:${FEEDBACK_EMAIL}?subject=${subject}&body=${body}`}
                icon={ICONS.idea}
            >
                {t('common.cta.suggestIdea')}
            </Button>
        </Card>
    );
}
