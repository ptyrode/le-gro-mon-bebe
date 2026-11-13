import Text from '@/components/ui/Text';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    hint?: ReactNode;
    error?: string | null;
}

export default function Field({
    id,
    label,
    hint,
    error,
    className,
    ...props
}: FieldProps) {
    const messageId = `${id}-message`;
    const message = error || hint;

    return (
        <div className={className}>
            <Text
                as="label"
                htmlFor={id}
                variant="label"
                className="mb-2 block"
            >
                {label}
            </Text>
            <input
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={message ? messageId : undefined}
                className="border-peach text-chocolate focus:border-coral placeholder:text-taupe/60 aria-invalid:border-raspberry w-full rounded-xl border-2 bg-white px-4 py-3 outline-none"
                {...props}
            />
            {message && (
                <Text
                    id={messageId}
                    variant={error ? 'error' : 'caption'}
                    className="mt-2"
                >
                    {message}
                </Text>
            )}
        </div>
    );
}
