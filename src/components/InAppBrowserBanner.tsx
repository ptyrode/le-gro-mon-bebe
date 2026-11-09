'use client';

import { cn } from '@/lib/cn';
import { chromeIntentUrl, isInAppBrowser, isIOS } from '@/lib/install';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

type Context = 'none' | 'ios' | 'android';

function readContext(): Context {
    if (!isInAppBrowser()) return 'none';
    return isIOS() ? 'ios' : 'android';
}

function subscribe() {
    return () => {};
}

export default function InAppBrowserBanner({
    className,
}: {
    className?: string;
}) {
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
                        {t('inAppBrowser.title')}
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                        {t('inAppBrowser.body')}
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                        {context === 'ios'
                            ? t('inAppBrowser.ios')
                            : t('inAppBrowser.android')}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {context === 'android' && (
                            <a
                                href={chromeIntentUrl(window.location)}
                                className="bg-accent hover:bg-accent-deep rounded-xl px-4 py-2 text-xs font-bold text-white transition"
                            >
                                {t('inAppBrowser.openChrome')}
                            </a>
                        )}
                        <button
                            type="button"
                            onClick={copyLink}
                            className="text-ink-soft px-2 py-2 text-xs font-semibold underline"
                        >
                            {copied
                                ? t('inAppBrowser.copied')
                                : t('inAppBrowser.copyLink')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
