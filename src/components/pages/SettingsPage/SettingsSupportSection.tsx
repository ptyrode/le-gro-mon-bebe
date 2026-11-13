'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ICONS } from '@/constants/icons';
import { BUY_ME_A_COFFEE_URL } from '@/constants/links';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';

export default function SettingsSupportSection() {
    const t = useTranslations();

    return (
        <Card
            className="mb-5"
            title={t('pages.settings.support.title')}
            hint={t('pages.settings.support.body')}
        >
            <Button
                href={BUY_ME_A_COFFEE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="tertiary"
                icon={ICONS.support}
                onClick={() => track({ event: 'support_click' })}
            >
                {t('common.cta.support')}
            </Button>
        </Card>
    );
}
