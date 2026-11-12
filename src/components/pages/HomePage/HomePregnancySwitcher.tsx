'use client';

import usePregnancyLabel from '@/hooks/usePregnancyLabel';
import { cn } from '@/utils/cn';
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
            {choices.map((p) => {
                const active = p.id === pregnancy.id;
                return (
                    <button
                        key={p.id}
                        type="button"
                        aria-pressed={active}
                        onClick={() => onSelect(p.id)}
                        className={cn(
                            'shrink-0 rounded-full border-2 px-4 py-1.5 text-base font-semibold whitespace-nowrap transition',
                            active
                                ? 'border-accent bg-accent text-white'
                                : 'border-cream-deep text-ink hover:border-accent/50 bg-white'
                        )}
                    >
                        {label(p)}
                    </button>
                );
            })}
        </nav>
    );
}
