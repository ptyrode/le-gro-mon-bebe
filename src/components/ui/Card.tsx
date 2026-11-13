import Text from '@/components/ui/Text';
import { cn } from '@/utils/cn';
import type { HTMLAttributes } from 'react';

type CardVariant = 'default' | 'info' | 'error';

const VARIANTS: Record<CardVariant, string> = {
    default: 'bg-white p-5 shadow-sm',
    info: 'border-coral/30 border-2 bg-white p-4',
    error: 'border-raspberry/30 bg-raspberry/10 border-2 p-4',
};

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    variant?: CardVariant;
    title?: string;
    hint?: string;
}

export default function Card({
    variant = 'default',
    title,
    hint,
    className,
    children,
    ...props
}: CardProps) {
    return (
        <section
            className={cn('rounded-xl', VARIANTS[variant], className)}
            {...props}
        >
            {(title || hint) && (
                <div className={cn(children && 'mb-3')}>
                    {title && <Text variant="label">{title}</Text>}
                    {hint && <Text variant="hint">{hint}</Text>}
                </div>
            )}
            {children}
        </section>
    );
}
