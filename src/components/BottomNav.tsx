'use client';

import { useTranslations } from 'next-intl';

export type View = 'dashboard' | 'timeline' | 'settings';

interface Props {
    view: View;
    onChange: (view: View) => void;
}

const TABS: { key: View; icon: string }[] = [
    { key: 'dashboard', icon: '🍼' },
    { key: 'timeline', icon: '📅' },
    { key: 'settings', icon: '⚙️' },
];

export default function BottomNav({ view, onChange }: Props) {
    const t = useTranslations();

    return (
        <nav className="border-cream-deep bg-cream/90 fixed inset-x-0 bottom-0 z-10 border-t backdrop-blur">
            <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
                {TABS.map((tab) => {
                    const active = view === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            onClick={() => onChange(tab.key)}
                            className={`flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-semibold transition ${
                                active ? 'text-accent-deep' : 'text-ink-soft'
                            }`}
                        >
                            <span className="text-xl">{tab.icon}</span>
                            {t(tab.key)}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
