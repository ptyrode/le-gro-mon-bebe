import type { PropsWithChildren } from 'react';

interface HomeStatusCardProps extends PropsWithChildren {
    emoji: string;
    title: string;
    body: string;
}

export default function HomeStatusCard({
    emoji,
    title,
    body,
    children,
}: HomeStatusCardProps) {
    return (
        <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
            <div
                aria-hidden="true"
                className="my-3 text-7xl leading-none"
            >
                {emoji}
            </div>
            <p className="text-ink text-2xl font-extrabold">{title}</p>
            <p className="text-ink-soft mt-3">{body}</p>
            {children}
        </section>
    );
}
