'use client';

import Pill from '@/components/ui/Pill';
import usePregnancyLabel from '@/hooks/usePregnancyLabel';
import { useTranslations } from 'next-intl';

interface HomePregnancySwitcherProps {
    state: AppState;
    pregnancy: Pregnancy;
    onSelect: (id: string) => void;
}

export default function HomePregnancySwitcher({
    state,
    pregnancy,
    onSelect,
}: HomePregnancySwitcherProps) {
    const t = useTranslations();
    const label = usePregnancyLabel();
    const choices = state.pregnancies.filter(
        (p) => !p.closedAt || p.id === pregnancy.id
    );

    if (choices.length < 2) return null;

    return (
        <nav
            aria-label={t('pages.home.switchLabel')}
            className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1"
        >
            {choices.map((p) => (
                <Pill
                    key={p.id}
                    active={p.id === pregnancy.id}
                    onClick={() => onSelect(p.id)}
                >
                    {label(p)}
                </Pill>
            ))}
        </nav>
    );
}
