'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import { ICONS } from '@/constants/icons';
import { isInAppBrowser, isIOS } from '@/utils/browser';
import {
    dismiss,
    getDeferredPrompt,
    isDismissed,
    promptInstall,
    subscribe,
} from '@/utils/installPrompt';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';
import { useSyncExternalStore } from 'react';

function isInstalled() {
    if (typeof window === 'undefined') return true;
    const standalone = window.matchMedia?.(
        '(display-mode: standalone)'
    )?.matches;
    const iosStandalone = (
        window.navigator as Navigator & { standalone?: boolean }
    ).standalone;
    return Boolean(standalone || iosStandalone);
}

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
        <Card
            variant="info"
            className="mt-6"
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden="true"
                    className="text-2xl"
                >
                    {ICONS.install}
                </span>
                <div className="min-w-0 flex-1">
                    <Text variant="label">
                        {t('common.installBanner.title')}
                    </Text>
                    <Text
                        variant="hint"
                        className="mt-1"
                    >
                        {state.ios
                            ? t('common.installBanner.ios')
                            : t('common.installBanner.android')}
                    </Text>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Button
                            variant="secondary"
                            onClick={dismiss}
                        >
                            {t('common.cta.later')}
                        </Button>
                        {state.canPrompt && (
                            <Button
                                onClick={async () => {
                                    const accepted = await promptInstall();
                                    track({
                                        event: 'pwa_install',
                                        outcome: accepted
                                            ? 'accepted'
                                            : 'dismissed',
                                    });
                                }}
                            >
                                {t('common.cta.install')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
