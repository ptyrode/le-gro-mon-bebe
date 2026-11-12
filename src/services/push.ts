import {
    PUSH_DB_NAME,
    PUSH_READY_TIMEOUT_MS,
    PUSH_STATE_KEY,
    PUSH_STORE_NAME,
} from '@/constants/push';

function isPushSupported(): boolean {
    return (
        typeof window !== 'undefined' &&
        'serviceWorker' in navigator &&
        'PushManager' in window &&
        'indexedDB' in window &&
        Boolean(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
    );
}

function openPushDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(PUSH_DB_NAME, 1);
        request.onupgradeneeded = () =>
            request.result.createObjectStore(PUSH_STORE_NAME);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function writePushState(state: PushLocalState | null): Promise<void> {
    const db = await openPushDatabase();
    await new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(PUSH_STORE_NAME, 'readwrite');
        const store = transaction.objectStore(PUSH_STORE_NAME);
        if (state) store.put(state, PUSH_STATE_KEY);
        else store.delete(PUSH_STATE_KEY);
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
    db.close();
}

function getWeekdayOf(lastPeriodDate: string): number {
    return new Date(`${lastPeriodDate}T00:00:00`).getDay();
}

function getWeekdaysOf(pregnancies: PushPregnancy[]): number[] {
    return [...new Set(pregnancies.map((p) => getWeekdayOf(p.lastPeriodDate)))];
}

function getReadyRegistration(): Promise<
    ServiceWorkerRegistration | undefined
> {
    return Promise.race([
        navigator.serviceWorker.ready,
        new Promise<undefined>((resolve) =>
            setTimeout(() => resolve(undefined), PUSH_READY_TIMEOUT_MS)
        ),
    ]);
}

function getApplicationServerKey(): Uint8Array<ArrayBuffer> {
    const base64 = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '';
    const padded = (base64 + '='.repeat((4 - (base64.length % 4)) % 4))
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    return Uint8Array.from(window.atob(padded), (c) => c.charCodeAt(0));
}

async function enablePush(state: PushLocalState): Promise<boolean> {
    if (!isPushSupported() || Notification.permission !== 'granted') {
        return false;
    }
    const registration =
        (await navigator.serviceWorker.getRegistration()) ??
        (await getReadyRegistration());
    if (!registration) return false;

    try {
        const subscription =
            (await registration.pushManager.getSubscription()) ??
            (await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: getApplicationServerKey(),
            }));
        await writePushState(state);
        const response = await fetch('/api/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subscription: subscription.toJSON(),
                weekdays: getWeekdaysOf(state.pregnancies),
            }),
        });
        return response.ok;
    } catch {
        return false;
    }
}

async function getCurrentSubscription(): Promise<PushSubscription | null> {
    if (!isPushSupported()) return null;
    const registration = await navigator.serviceWorker.getRegistration();
    return (await registration?.pushManager.getSubscription()) ?? null;
}

async function disablePush(): Promise<void> {
    if (!isPushSupported()) return;
    try {
        const subscription = await getCurrentSubscription();
        if (subscription) {
            await fetch('/api/push', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ endpoint: subscription.endpoint }),
            });
            await subscription.unsubscribe();
        }
        await writePushState(null);
    } catch {}
}

export { disablePush, enablePush };
