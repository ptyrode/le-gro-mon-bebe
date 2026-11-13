import { cn } from '@/utils/cn';
import type { HTMLAttributes } from 'react';

type BadgeVariant = 'primary' | 'secondary';

const VARIANTS: Record<BadgeVariant, string> = {
    primary: 'bg-coral text-white',
    secondary: 'text-terracotta bg-white shadow-sm',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}

export default function Badge({
    variant = 'primary',
    className,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex shrink-0 items-center rounded-3xl px-3 py-1 text-sm font-bold',
                VARIANTS[variant],
                className
            )}
            {...props}
        />
    );
}
