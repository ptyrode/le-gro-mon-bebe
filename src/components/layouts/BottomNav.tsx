'use client';

import { ICONS } from '@/constants/icons';
import { ROUTE_HOME, ROUTE_SETTINGS, ROUTE_TIMELINE } from '@/constants/routes';
import { cn } from '@/utils/cn';
import { track } from '@/utils/track';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

type View = 'dashboard' | 'timeline' | 'settings';

const TABS: { key: View; href: string; icon: string }[] = [
    { key: 'dashboard', href: ROUTE_HOME, icon: ICONS.home },
    { key: 'timeline', href: ROUTE_TIMELINE, icon: ICONS.timeline },
    { key: 'settings', href: ROUTE_SETTINGS, icon: ICONS.settings },
];

export default function BottomNav() {
    const t = useTranslations();
    const pathname = usePathname();

    return (
        <nav className="border-peach bg-cream/90 fixed inset-x-0 bottom-0 z-10 border-t backdrop-blur">
            <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
                {TABS.map((tab) => {
                    const active = pathname === tab.href;
                    return (
                        <Link
                            key={tab.key}
                            href={tab.href}
                            aria-current={active ? 'page' : undefined}
                            onClick={() =>
                                track({ event: 'view_change', view: tab.key })
                            }
                            className={cn(
                                'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-base leading-snug font-semibold transition',
                                active ? 'text-terracotta' : 'text-taupe'
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className="text-xl"
                            >
                                {tab.icon}
                            </span>
                            {t(`common.nav.${tab.key}`)}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
