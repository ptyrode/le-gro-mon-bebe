import { sendGTMEvent } from '@next/third-parties/google';

export function track(payload: AnalyticsEvent) {
    if (typeof window === 'undefined') return;
    sendGTMEvent(payload);
}
