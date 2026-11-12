'use client';

import { readNotificationPermission } from '@/utils/browser';
import { cn } from '@/utils/cn';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

interface SettingsNotificationsSectionProps {
    enabled: boolean;
    onSetEnabled: (enabled: boolean) => void;
}

const noSubscribe = () => () => {};

export default function SettingsNotificationsSection({
    enabled,
    onSetEnabled,
}: SettingsNotificationsSectionProps) {
    const t = useTranslations();
    const [message, setMessage] = useState<string | null>(null);
    const initialPermission = useSyncExternalStore<NotificationSupport>(
        noSubscribe,
        readNotificationPermission,
        () => 'unsupported'
    );
    const [requestedPermission, setRequestedPermission] =
        useState<NotificationSupport | null>(null);
    const permission = requestedPermission ?? initialPermission;
    const active = enabled && permission === 'granted';

    const handleToggle = async () => {
        if (permission === 'unsupported') {
            setMessage(t('messages.notificationPermission.unsupported'));
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        if (active) {
            onSetEnabled(false);
            setMessage(null);
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        if (permission === 'denied') {
            setMessage(t('messages.notificationPermission.blocked'));
            track({
                event: 'notifications_toggle',
                enabled: false,
                permission,
            });
            return;
        }
        const next = await Notification.requestPermission();
        setRequestedPermission(next);
        onSetEnabled(next === 'granted');
        setMessage(
            next === 'granted'
                ? null
                : t('messages.notificationPermission.denied')
        );
        track({
            event: 'notifications_toggle',
            enabled: next === 'granted',
            permission: next,
        });
    };

    return (
        <section className="mb-5 rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-ink text-sm font-semibold">
                        {t('pages.settings.notifications.title')}
                    </p>
                    <p className="text-ink-soft text-xs">
                        {t('pages.settings.notifications.hint')}
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleToggle}
                    role="switch"
                    aria-checked={active}
                    className={cn(
                        'relative h-7 w-12 rounded-full transition',
                        active ? 'bg-accent' : 'bg-cream-deep'
                    )}
                >
                    <span
                        className={cn(
                            'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all',
                            active ? 'left-6' : 'left-1'
                        )}
                    />
                </button>
            </div>
            {message && <p className="text-berry mt-3 text-xs">{message}</p>}
        </section>
    );
}
