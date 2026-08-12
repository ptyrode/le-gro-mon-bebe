export type NotificationSupport = 'unsupported' | NotificationPermission;

export function readNotificationPermission(): NotificationSupport {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return 'unsupported';
    }
    return Notification.permission;
}

export async function showNotification(
    title: string,
    options: NotificationOptions
): Promise<boolean> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return false;
    }
    if (Notification.permission !== 'granted') return false;

    try {
        const registration = await navigator.serviceWorker?.getRegistration?.();
        if (registration) {
            await registration.showNotification(title, options);
            return true;
        }
    } catch {
        return false;
    }

    try {
        new Notification(title, options);
        return true;
    } catch {
        return false;
    }
}
