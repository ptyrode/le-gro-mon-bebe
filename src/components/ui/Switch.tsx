import Text from '@/components/ui/Text';
import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

interface SwitchProps extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'role' | 'id'
> {
    id: string;
    label: string;
    hint?: string;
    error?: string | null;
    checked: boolean;
}

export default function Switch({
    id,
    label,
    hint,
    error,
    checked,
    className,
    ...props
}: SwitchProps) {
    const labelId = `${id}-label`;
    const errorId = `${id}-error`;

    return (
        <div className={className}>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <Text
                        id={labelId}
                        variant="label"
                    >
                        {label}
                    </Text>
                    {hint && <Text variant="hint">{hint}</Text>}
                </div>
                <button
                    id={id}
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    aria-labelledby={labelId}
                    aria-describedby={error ? errorId : undefined}
                    className={cn(
                        'relative h-7 w-12 shrink-0 rounded-full transition',
                        checked ? 'bg-coral' : 'bg-peach'
                    )}
                    {...props}
                >
                    <span
                        className={cn(
                            'absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all',
                            checked ? 'left-6' : 'left-1'
                        )}
                    />
                </button>
            </div>
            {error && (
                <Text
                    id={errorId}
                    variant="error"
                    className="mt-2"
                >
                    {error}
                </Text>
            )}
        </div>
    );
}
