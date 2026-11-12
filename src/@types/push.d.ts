interface PushText {
    title: string;
    body: string;
}

interface PushPregnancy {
    id: string;
    lastPeriodDate: string;
    weeks: Record<number, PushText>;
}

interface PushLocalState {
    pregnancies: PushPregnancy[];
}

interface StoredSubscription {
    endpoint: string;
    keys: { p256dh: string; auth: string };
}
