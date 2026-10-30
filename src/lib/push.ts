export interface PushText {
    title: string;
    body: string;
}

export interface PushLocalState {
    lastPeriodDate: string;
    weeks: Record<number, PushText>;
}

const DB_NAME = 'lgmb';
const STORE = 'push';
const STATE_KEY = 'state';

function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function writeLocalState(state: PushLocalState | null): Promise<void> {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE, 'readwrite');
        const store = transaction.objectStore(STORE);
        if (state) store.put(state, STATE_KEY);
        else store.delete(STATE_KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
    db.close();
}

function applicationServerKey(): Uint8Array<ArrayBuffer> {
    const base64 = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';
    const padded = (base64 + '='.repeat((4 - (base64.length % 4)) % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    return Uint8Array.from(window.atob(padded), (c) => c.charCodeAt(0));
}

function isPushSupported(): boolean {
    return (
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        'PushManager' in window &&
        'indexedDB' in window &&
        Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
    );
}

const READY_TIMEOUT_MS = 10_000;

function readyRegistration(): Promise<ServiceWorkerRegistration | undefined> {
    return Promise.race([
        navigator.serviceWorker.ready,
        new Promise<undefined>((resolve) =>
            setTimeout(() => resolve(undefined), READY_TIMEOUT_MS)
        ),
    ]);
}

async function currentSubscription(): Promise<PushSubscription | null> {
    if (!isPushSupported()) return null;
    const registration = await navigator.serviceWorker.getRegistration();
    return (await registration?.pushManager.getSubscription()) ?? null;
}

export function weekdayOf(lastPeriodDate: string): number {
    return new Date(`${lastPeriodDate}T00:00:00`).getDay();
}

export async function enablePush(state: PushLocalState): Promise<boolean> {
    if (!isPushSupported() || Notification.permission !== 'granted') {
        return false;
    }
    const registration =
        (await navigator.serviceWorker.getRegistration()) ??
        (await readyRegistration());
    if (!registration) return false;

    try {
        const subscription =
            (await registration.pushManager.getSubscription()) ??
            (await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey(),
            }));
        await writeLocalState(state);
        const response = await fetch('/api/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subscription: subscription.toJSON(),
                weekday: weekdayOf(state.lastPeriodDate),
            }),
        });
        return response.ok;
    } catch {
        return false;
    }
}

export async function disablePush(): Promise<void> {
    if (!isPushSupported()) return;
    try {
        const subscription = await currentSubscription();
        if (subscription) {
            await fetch('/api/push', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endpoint: subscription.endpoint }),
            });
            await subscription.unsubscribe();
        }
        await writeLocalState(null);
    } catch {}
}
