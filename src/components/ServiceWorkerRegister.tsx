'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
    useEffect(() => {
        // On n'enregistre le SW qu'en production (évite d'interférer avec le HMR en dev).
        if (process.env.NODE_ENV !== 'production') return;
        if (!('serviceWorker' in navigator)) return;
        navigator.serviceWorker.register('/sw.js').catch(() => {
            /* échec silencieux : l'appli fonctionne sans SW */
        });
    }, []);

    return null;
}
