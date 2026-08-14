import { sendGTMEvent } from '@next/third-parties/google';

export type AnalyticsEvent =
    | { event: 'view_change'; view: string }
    | { event: 'category_change'; category: string; source: string }
    | {
          event: 'wikipedia_click';
          category: string;
          week: number;
          item: string;
      }
    | { event: 'pwa_install'; outcome: 'accepted' | 'dismissed' }
    | { event: 'notifications_toggle'; enabled: boolean; permission: string }
    | { event: 'support_click' };

export function track(payload: AnalyticsEvent) {
    if (typeof window === 'undefined') return;
    sendGTMEvent(payload);
}
