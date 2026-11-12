import {
    parseSubscription,
    parseWeekdays,
    removeSubscription,
    saveSubscription,
} from '@/services/subscription';

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const subscription = parseSubscription(body?.subscription);
    const weekdays = parseWeekdays(body?.weekdays ?? body?.weekday);
    if (!subscription || !weekdays) {
        return Response.json({ error: 'invalid' }, { status: 400 });
    }
    await saveSubscription(subscription, weekdays);
    return new Response(null, { status: 204 });
}

export async function DELETE(request: Request) {
    const body = await request.json().catch(() => null);
    if (typeof body?.endpoint !== 'string') {
        return Response.json({ error: 'invalid' }, { status: 400 });
    }
    await removeSubscription(body.endpoint);
    return new Response(null, { status: 204 });
}
