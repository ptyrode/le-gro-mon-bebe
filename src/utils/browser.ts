function isIOS() {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent;
    const iOS = /iphone|ipad|ipod/i.test(ua);
    const iPadOS = /macintosh/i.test(ua) && window.navigator.maxTouchPoints > 1;
    return iOS || iPadOS;
}

function isInAppBrowser() {
    if (typeof window === 'undefined') return false;
    return /FBAN|FBAV|FB_IAB|FBIOS|Messenger|Instagram/i.test(
        window.navigator.userAgent
    );
}

function readNotificationPermission(): NotificationSupport {
    if (typeof window === 'undefined' || !('Notification' in window)) {
        return 'unsupported';
    }
    return Notification.permission;
}

const permissionListeners = new Set<() => void>();

function subscribeNotificationPermission(listener: () => void) {
    permissionListeners.add(listener);
    return () => {
        permissionListeners.delete(listener);
    };
}

async function requestNotificationPermission(): Promise<NotificationSupport> {
    if (readNotificationPermission() === 'unsupported') return 'unsupported';
    const permission = await Notification.requestPermission();
    permissionListeners.forEach((listener) => listener());
    return permission;
}

export {
    isInAppBrowser,
    isIOS,
    readNotificationPermission,
    requestNotificationPermission,
    subscribeNotificationPermission,
};
