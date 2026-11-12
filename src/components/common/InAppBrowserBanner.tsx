'use client';

import { isInAppBrowser, isIOS } from '@/utils/browser';
import { cn } from '@/utils/cn';
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
        <section
            className={cn(
                'border-accent/30 bg-accent/10 rounded-3xl border-2 p-4',
                className
            )}
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden="true"
                    className="text-2xl"
                >
                    🧭
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-ink text-sm font-bold">
                        {t('common.inAppBrowserBanner.title')}
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                        {t('common.inAppBrowserBanner.body')}
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                        {context === 'ios'
                            ? t('common.inAppBrowserBanner.ios')
                            : t('common.inAppBrowserBanner.android')}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {context === 'android' && (
                            <a
                                href={getChromeIntentUrl(window.location)}
                                className="bg-accent hover:bg-accent-deep rounded-xl px-4 py-2 text-xs font-bold text-white transition"
                            >
                                {t('common.cta.openChrome')}
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={copyLink}
                            className="text-ink-soft px-2 py-2 text-base font-semibold underline"
                        >
                            {copied
                                ? t('messages.linkCopied')
                                : t('common.cta.copyLink')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
