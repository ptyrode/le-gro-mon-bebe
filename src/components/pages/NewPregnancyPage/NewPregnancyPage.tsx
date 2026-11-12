'use client';

import Onboarding from '@/components/common/Onboarding';
import { ROUTE_HOME } from '@/constants/routes';
import usePregnancy from '@/hooks/usePregnancy';
import { useRouter } from 'next/navigation';

export default function NewPregnancyPage() {
    const { start } = usePregnancy();
    const router = useRouter();

    return (
        <Onboarding
            onCancel={() => router.back()}
            onStart={(lastPeriodDate, category, name) => {
                start(lastPeriodDate, category, name);
                router.replace(ROUTE_HOME);
            }}
        />
    );
}
