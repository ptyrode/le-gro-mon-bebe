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

export { isInAppBrowser, isIOS, readNotificationPermission };
