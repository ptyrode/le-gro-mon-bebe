import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    active: boolean;
    icon?: ReactNode;
}

export default function Pill({
    active,
    icon,
    className,
    children,
    ...props
}: PillProps) {
    return (
        <button
            type="button"
            aria-pressed={active}
            className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-3xl border-2 px-4 py-1.5 text-base font-semibold whitespace-nowrap transition',
                active
                    ? 'border-coral bg-coral text-white'
                    : 'border-peach text-chocolate hover:border-coral/50 bg-white',
                className
            )}
            {...props}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            {children}
        </button>
    );
}
