import {
    isWeekday,
    parseSubscription,
    removeSubscription,
    saveSubscription,
} from '@/lib/pushStore';

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const subscription = parseSubscription(body?.subscription);
    if (!subscription || !isWeekday(body?.weekday)) {
        return Response.json({ error: 'invalid' }, { status: 400 });
    }
    await saveSubscription(subscription, body.weekday);
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
