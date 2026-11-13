import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
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
        <Card className="text-center">
            <div
                aria-hidden="true"
                className="my-3 text-7xl leading-none"
            >
                {emoji}
            </div>
            <Text variant="headline">{title}</Text>
            <Text className="mt-3">{body}</Text>
            {children}
        </Card>
    );
}
