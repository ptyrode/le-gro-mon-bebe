import { PUSH_ENDPOINTS_KEY } from '@/constants/push';
import { Redis } from '@upstash/redis';

function getWeekdayKey(weekday: number): string {
    return `push:weekday:${weekday}`;
}

function isWeekday(value: unknown): value is number {
    return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 6;
}

function parseWeekdays(value: unknown): number[] | null {
    const list = Array.isArray(value) ? value : [value];
    if (list.length === 0 || !list.every(isWeekday)) return null;
    return [...new Set(list)];
}

function parseSubscription(value: unknown): StoredSubscription | null {
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

let client: Redis | null = null;

function getRedisClient(): Redis {
    client ??= new Redis({
        url: process.env.KV_REST_API_URL ?? '',
        token: process.env.KV_REST_API_TOKEN ?? '',
    });
    return client;
}

async function getStoredWeekdays(endpoint: string): Promise<number[]> {
    const stored = await getRedisClient().hget<unknown>(
        PUSH_ENDPOINTS_KEY,
        endpoint
    );
    return stored === null ? [] : (parseWeekdays(stored) ?? []);
}

async function saveSubscription(
    subscription: StoredSubscription,
    weekdays: number[]
): Promise<void> {
    const previous = await getStoredWeekdays(subscription.endpoint);
    await Promise.all(
        previous
            .filter((weekday) => !weekdays.includes(weekday))
            .map((weekday) =>
                getRedisClient().hdel(
                    getWeekdayKey(weekday),
                    subscription.endpoint
                )
            )
    );
    await Promise.all(
        weekdays.map((weekday) =>
            getRedisClient().hset(getWeekdayKey(weekday), {
                [subscription.endpoint]: subscription,
            })
        )
    );
    await getRedisClient().hset(PUSH_ENDPOINTS_KEY, {
        [subscription.endpoint]: weekdays,
    });
}

async function removeSubscription(endpoint: string): Promise<void> {
    const weekdays = await getStoredWeekdays(endpoint);
    await Promise.all(
        weekdays.map((weekday) =>
            getRedisClient().hdel(getWeekdayKey(weekday), endpoint)
        )
    );
    await getRedisClient().hdel(PUSH_ENDPOINTS_KEY, endpoint);
}

async function getSubscriptionsForWeekday(
    weekday: number
): Promise<StoredSubscription[]> {
    const all = await getRedisClient().hgetall<
        Record<string, StoredSubscription>
    >(getWeekdayKey(weekday));
    return Object.values(all ?? {});
}

export {
    getSubscriptionsForWeekday,
    isWeekday,
    parseSubscription,
    parseWeekdays,
    removeSubscription,
    saveSubscription,
};
