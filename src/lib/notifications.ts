export type NotificationSupport = 'unsupported' | NotificationPermission;

export function readNotificationPermission(): NotificationSupport {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return 'unsupported';
    }
    return Notification.permission;
}
