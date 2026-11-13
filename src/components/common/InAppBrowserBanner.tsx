'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { ICONS } from '@/constants/icons';
import { isInAppBrowser, isIOS } from '@/utils/browser';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

function getChromeIntentUrl(location: Location) {
    return `intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
}

type Context = 'none' | 'ios' | 'android';

function readContext(): Context {
    if (!isInAppBrowser()) return 'none';
    return isIOS() ? 'ios' : 'android';
}

function subscribe() {
    return () => {};
}

interface InAppBrowserBannerProps {
    className?: string;
}

export default function InAppBrowserBanner({
    className,
}: InAppBrowserBannerProps) {
    const t = useTranslations();
    const context = useSyncExternalStore(
        subscribe,
        readContext,
        (): Context => 'none'
    );
    const [copied, setCopied] = useState(false);

    if (context === 'none') return null;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

    return (
        <Card
            variant="info"
            className={className}
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden="true"
                    className="text-2xl"
                >
                    {ICONS.browser}
                </span>
                <div className="min-w-0 flex-1">
                    <Text variant="label">
                        {t('common.inAppBrowserBanner.title')}
                    </Text>
                    <Text
                        variant="hint"
                        className="mt-1"
                    >
                        {t('common.inAppBrowserBanner.body')}
                    </Text>
                    <Text
                        variant="hint"
                        className="mt-1"
                    >
                        {context === 'ios'
                            ? t('common.inAppBrowserBanner.ios')
                            : t('common.inAppBrowserBanner.android')}
                    </Text>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {context === 'android' && (
                            <Button href={getChromeIntentUrl(window.location)}>
                                {t('common.cta.openChrome')}
                            </Button>
                        )}
                        <Button
                            variant="secondary"
                            onClick={copyLink}
                        >
                            {copied
                                ? t('messages.linkCopied')
                                : t('common.cta.copyLink')}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
