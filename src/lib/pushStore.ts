import { Redis } from '@upstash/redis';

export interface StoredSubscription {
    endpoint: string;
    keys: { p256dh: string; auth: string };
}

const ENDPOINTS_KEY = 'push:endpoints';

let client: Redis | null = null;

function redis(): Redis {
    client ??= new Redis({
        url: process.env.KV_REST_API_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? '',
    });
    return client;
}

function weekdayKey(weekday: number): string {
    return `push:weekday:${weekday}`;
}

export function parseSubscription(value: unknown): StoredSubscription | null {
    if (!value || typeof value !== 'object') return null;
    const { endpoint, keys } = value as Partial<StoredSubscription>;
    if (
        typeof endpoint !== 'string' ||
        !endpoint.startsWith('https://') ||
        endpoint.length > 1000 ||
        typeof keys?.p256dh !== 'string' ||
        typeof keys?.auth !== 'string'
    ) {
        return null;
    }
    return { endpoint, keys: { p256dh: keys.p256dh, auth: keys.auth } };
}

export function isWeekday(value: unknown): value is number {
    return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 6;
}

export async function saveSubscription(
    subscription: StoredSubscription,
    weekday: number
): Promise<void> {
    const previous = await redis().hget<number>(
        ENDPOINTS_KEY,
        subscription.endpoint
    );
    if (previous !== null && previous !== weekday) {
        await redis().hdel(weekdayKey(previous), subscription.endpoint);
    }
    await redis().hset(weekdayKey(weekday), {
        [subscription.endpoint]: subscription,
    });
    await redis().hset(ENDPOINTS_KEY, { [subscription.endpoint]: weekday });
}

export async function removeSubscription(endpoint: string): Promise<void> {
    const weekday = await redis().hget<number>(ENDPOINTS_KEY, endpoint);
    if (weekday !== null) {
        await redis().hdel(weekdayKey(weekday), endpoint);
    }
    await redis().hdel(ENDPOINTS_KEY, endpoint);
}

export async function subscriptionsFor(
    weekday: number
): Promise<StoredSubscription[]> {
    const all = await redis().hgetall<Record<string, StoredSubscription>>(
        weekdayKey(weekday)
    );
    return Object.values(all ?? {});
}
