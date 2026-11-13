'use client';

import Onboarding from '@/components/common/Onboarding';
import BottomNav from '@/components/layouts/BottomNav';
import { ICONS } from '@/constants/icons';
import { ROUTE_HOME } from '@/constants/routes';
import usePregnancy from '@/hooks/usePregnancy';
import { usePathname, useRouter } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';

interface DefaultLayoutProps extends PropsWithChildren {
    hasBottomNav?: boolean;
    requiresPregnancy?: boolean;
}

export default function DefaultLayout({
    children,
    hasBottomNav = true,
    requiresPregnancy = true,
}: DefaultLayoutProps) {
    const { loading, active, start } = usePregnancy();
    const pathname = usePathname();
    const router = useRouter();
    const empty = requiresPregnancy && !loading && !active;

    useEffect(() => {
        if (empty && pathname !== ROUTE_HOME) router.replace(ROUTE_HOME);
    }, [empty, pathname, router]);

    if (!requiresPregnancy) return children;

    if (loading) {
        return (
            <div className="flex min-h-dvh items-center justify-center text-4xl">
                {ICONS.home}
            </div>
        );
    }

    if (!active) {
        return (
            <Onboarding
                onStart={(lastPeriodDate, category, name) => {
                    start(lastPeriodDate, category, name);
                    router.replace(ROUTE_HOME);
                }}
            />
        );
    }

    return (
        <>
            {children}
            {hasBottomNav && <BottomNav />}
        </>
    );
}
