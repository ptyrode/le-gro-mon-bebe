export interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISMISS_KEY = 'lgmb:install-dismissed';
const DAYS_BEFORE_REMINDER = 7;

let deferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

function notify() {
    listeners.forEach((listener) => listener());
}

if (typeof window !== 'undefined') {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e as BeforeInstallPromptEvent;
        notify();
    });
    window.addEventListener('appinstalled', () => {
        deferredPrompt = null;
        notify();
    });
}

export function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

export function getDeferredPrompt() {
    return deferredPrompt;
}

export async function promptInstall() {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    notify();
    return outcome === 'accepted';
}

export function isInstalled() {
    if (typeof window === 'undefined') return true;
    const standalone = window.matchMedia?.(
        '(display-mode: standalone)'
    )?.matches;
    const iosStandalone = (
        window.navigator as Navigator & { standalone?: boolean }
    ).standalone;
    return Boolean(standalone || iosStandalone);
}

export function isIOS() {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent;
    const iOS = /iphone|ipad|ipod/i.test(ua);
    const iPadOS = /macintosh/i.test(ua) && window.navigator.maxTouchPoints > 1;
    return iOS || iPadOS;
}

export function isInAppBrowser() {
    if (typeof window === 'undefined') return false;
    return /FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram/i.test(
        window.navigator.userAgent
    );
}

export function chromeIntentUrl(location: Location) {
    return `intent://${location.host}${location.pathname}#Intent;scheme=https;package=com.android.chrome;end`;
}

export function isDismissed(now: number = Date.now()) {
    if (typeof window === 'undefined') return true;
    try {
        const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
        if (!dismissedAt) return false;
        const elapsed = now - Number(dismissedAt);
        return elapsed < DAYS_BEFORE_REMINDER * 24 * 60 * 60 * 1000;
    } catch {
        return false;
    }
}

export function dismiss() {
    try {
        window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    notify();
}
