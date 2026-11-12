import { EN_SHORT_WEEKDAYS, ONE_DAY_SECONDS } from '@/constants/date';
import {
    getSubscriptionsForWeekday,
    isWeekday,
    removeSubscription,
} from '@/services/subscription';
import webpush from 'web-push';

function parisWeekday(date: Date): number {
    const name = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Paris',
        weekday: 'short',
    }).format(date);
    return EN_SHORT_WEEKDAYS.indexOf(name);
}

function isExpired(error: unknown): boolean {
    return (
        error instanceof webpush.WebPushError &&
        (error.statusCode === 404 || error.statusCode === 410)
    );
}

export async function GET(request: Request) {
    const secret = process.env.CRON_SECRET;
    if (
        !secret ||
        request.headers.get('authorization') !== `Bearer ${secret}`
    ) {
        return new Response(null, { status: 401 });
    }

    webpush.setVapidDetails(
        process.env.VAPID_SUBJECT ?? '',
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '',
        process.env.VAPID_PRIVATE_KEY ?? ''
    );

    const param = new URL(request.url).searchParams.get('weekday');
    const requested = param ? Number(param) : null;
    const weekday = isWeekday(requested) ? requested : parisWeekday(new Date());
    const subscriptions = await getSubscriptionsForWeekday(weekday);
    let sent = 0;
    let removed = 0;
    let failed = 0;

    await Promise.all(
        subscriptions.map(async (subscription) => {
            try {
                await webpush.sendNotification(subscription, null, {
                    TTL: ONE_DAY_SECONDS,
                    urgency: 'high',
                });
                sent++;
            } catch (error) {
                if (isExpired(error)) {
                    await removeSubscription(subscription.endpoint);
                    removed++;
                } else {
                    failed++;
                }
            }
        })
    );

    const result = { weekday, sent, removed, failed };
    console.warn('push cron', result);
    return Response.json(result);
}
