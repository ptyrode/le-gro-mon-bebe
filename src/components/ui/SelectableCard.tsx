import { cn } from '@/utils/cn';
import type { PropsWithChildren, ReactNode } from 'react';

interface SelectableCardProps extends PropsWithChildren {
    selected: boolean;
    onSelect: () => void;
    footer?: ReactNode;
    className?: string;
}

export default function SelectableCard({
    selected,
    onSelect,
    footer,
    className,
    children,
}: SelectableCardProps) {
    return (
        <div
            className={cn(
                'relative rounded-xl border-2 p-3 transition',
                selected
                    ? 'border-coral bg-coral/10 shadow-sm'
                    : 'border-peach hover:border-coral/50 bg-white',
                className
            )}
        >
            <button
                type="button"
                aria-pressed={selected}
                onClick={onSelect}
                className="block w-full text-left after:absolute after:inset-0 after:rounded-xl"
            >
                {children}
            </button>
            {footer && (
                <div className="pointer-events-none relative mt-2 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
                    {footer}
                </div>
            )}
        </div>
    );
}
