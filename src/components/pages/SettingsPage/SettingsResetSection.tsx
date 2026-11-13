'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
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
        <Card variant="error">
            {!confirming ? (
                <Button
                    variant="error"
                    onClick={() => setConfirming(true)}
                >
                    {t('common.cta.reset')}
                </Button>
            ) : (
                <div>
                    <Text
                        variant="caption"
                        className="mb-3"
                    >
                        {t('pages.settings.reset.confirm')}
                    </Text>
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setConfirming(false)}
                        >
                            {t('common.cta.cancel')}
                        </Button>
                        <Button
                            variant="error"
                            size="sm"
                            onClick={onReset}
                        >
                            {t('common.cta.confirmReset')}
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}
