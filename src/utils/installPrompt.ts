import { MS_PER_DAY } from '@/constants/date';
import {
    INSTALL_DISMISS_KEY,
    INSTALL_REMINDER_DAYS,
} from '@/constants/install';

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

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function getDeferredPrompt() {
    return deferredPrompt;
}

async function promptInstall() {
    if (!deferredPrompt) return false;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
    notify();
    return outcome === 'accepted';
}

function isDismissed(now: number = Date.now()) {
    if (typeof window === 'undefined') return true;
    try {
        const dismissedAt = window.localStorage.getItem(INSTALL_DISMISS_KEY);
        if (!dismissedAt) return false;
        const elapsed = now - Number(dismissedAt);
        return elapsed < INSTALL_REMINDER_DAYS * MS_PER_DAY;
    } catch {
        return false;
    }
}

function dismiss() {
    try {
        window.localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now()));
    } catch {}
    notify();
}

export { dismiss, getDeferredPrompt, isDismissed, promptInstall, subscribe };
