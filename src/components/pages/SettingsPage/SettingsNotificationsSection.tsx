'use client';

import Card from '@/components/ui/Card';
import Switch from '@/components/ui/Switch';
import {
    readNotificationPermission,
    requestNotificationPermission,
    subscribeNotificationPermission,
} from '@/utils/browser';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';
import { useState, useSyncExternalStore } from 'react';

interface SettingsNotificationsSectionProps {
    enabled: boolean;
    onSetEnabled: (enabled: boolean) => void;
}

export default function SettingsNotificationsSection({
    enabled,
    onSetEnabled,
}: SettingsNotificationsSectionProps) {
    const t = useTranslations();
    const [message, setMessage] = useState<string | null>(null);
    const initialPermission = useSyncExternalStore<NotificationSupport>(
        subscribeNotificationPermission,
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
        const next = await requestNotificationPermission();
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
        <Card className="mb-5">
            <Switch
                id="notifications"
                label={t('pages.settings.notifications.title')}
                hint={t('pages.settings.notifications.hint')}
                error={message}
                checked={active}
                onClick={handleToggle}
            />
        </Card>
    );
}
