import { cn } from '@/utils/cn';
import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
} from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'error';

type ButtonSize = 'sm' | 'md';

const SIZES: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
};

const VARIANTS: Record<ButtonVariant, string> = {
    primary: 'bg-coral text-white',
    secondary: 'bg-peach text-chocolate',
    tertiary: 'bg-lemon text-chocolate',
    error: 'bg-raspberry text-white',
};

interface ButtonOwnProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
}

type ButtonProps = ButtonOwnProps &
    (
        | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
        | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    );

export default function Button({
    variant = 'primary',
    size = 'md',
    icon,
    className,
    children,
    ...props
}: ButtonProps) {
    const classes = cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition hover:brightness-95',
        SIZES[size],
        VARIANTS[variant],
        className
    );
    const content = (
        <>
            {icon && <span aria-hidden="true">{icon}</span>}
            {children}
        </>
    );

    if (props.href !== undefined) {
        return (
            <a
                className={classes}
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            type="button"
            className={classes}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {content}
        </button>
    );
}
