import { cn } from '@/utils/cn';
import type { ElementType, HTMLAttributes } from 'react';

type TextVariant =
    | 'display'
    | 'headline'
    | 'title'
    | 'subtitle'
    | 'body'
    | 'label'
    | 'caption'
    | 'hint'
    | 'fun'
    | 'error';

const VARIANTS: Record<TextVariant, string> = {
    display: 'text-chocolate text-3xl font-extrabold tracking-tight',
    headline: 'text-chocolate text-2xl font-extrabold',
    title: 'text-chocolate text-xl font-extrabold tracking-tight',
    subtitle: 'text-chocolate text-lg font-extrabold tracking-tight',
    body: 'text-taupe text-base',
    label: 'text-chocolate text-sm font-semibold',
    caption: 'text-taupe text-sm',
    hint: 'text-taupe text-xs leading-relaxed',
    fun: 'text-taupe text-sm italic',
    error: 'text-raspberry text-sm font-medium',
};

interface TextProps extends HTMLAttributes<HTMLElement> {
    variant?: TextVariant;
    as?: ElementType;
    htmlFor?: string;
}

export default function Text({
    variant = 'body',
    as: Component = 'p',
    className,
    ...props
}: TextProps) {
    return (
        <Component
            className={cn(VARIANTS[variant], className)}
            {...props}
        />
    );
}
