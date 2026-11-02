'use client';

import { track } from '@/lib/analytics';
import {
    dismiss,
    getDeferredPrompt,
    isDismissed,
    isInAppBrowser,
    isInstalled,
    isIOS,
    promptInstall,
    subscribe,
} from '@/lib/install';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

interface State {
    installed: boolean;
    inApp: boolean;
    ios: boolean;
    dismissed: boolean;
    canPrompt: boolean;
}

const SERVER_STATE: State = {
    installed: true,
    inApp: false,
    ios: false,
    dismissed: true,
    canPrompt: false,
};

let cache: State = SERVER_STATE;

function readState(): State {
    const next: State = {
        installed: isInstalled(),
        inApp: isInAppBrowser(),
        ios: isIOS(),
        dismissed: isDismissed(),
        canPrompt: getDeferredPrompt() !== null,
    };
    const unchanged =
        cache.installed === next.installed &&
        cache.inApp === next.inApp &&
        cache.ios === next.ios &&
        cache.dismissed === next.dismissed &&
        cache.canPrompt === next.canPrompt;
    if (!unchanged) cache = next;
    return cache;
}

export default function InstallBanner() {
    const t = useTranslations();
    const state = useSyncExternalStore(
        subscribe,
        readState,
        () => SERVER_STATE
    );

    if (state.installed || state.inApp || state.dismissed) return null;
    if (!state.ios && !state.canPrompt) return null;

    return (
        <section className="border-accent/30 bg-accent/10 mt-6 rounded-3xl border-2 p-4">
            <div className="flex items-start gap-3">
                <span
                    aria-hidden="true"
                    className="text-2xl"
                >
                    📲
                </span>
                <div className="min-w-0 flex-1">
                    <p className="text-ink text-sm font-bold">
                        {t('install.title')}
                    </p>
                    <p className="text-ink-soft mt-1 text-xs leading-relaxed">
                        {state.ios ? t('install.ios') : t('install.android')}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {state.canPrompt && (
                            <button
                                type="button"
                                onClick={async () => {
                                    const accepted = await promptInstall();
                                    track({
                                        event: 'pwa_install',
                                        outcome: accepted
                                            ? 'accepted'
                                            : 'dismissed',
                                    });
                                }}
                                className="bg-accent hover:bg-accent-deep rounded-xl px-4 py-2 text-xs font-bold text-white transition"
                            >
                                {t('install.cta')}
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={dismiss}
                            className="text-ink-soft px-2 py-2 text-xs font-semibold underline"
                        >
                            {t('install.dismiss')}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
