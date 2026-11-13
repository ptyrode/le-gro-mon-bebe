import Text from '@/components/ui/Text';
import type { PropsWithChildren } from 'react';

interface StyleguideSectionProps extends PropsWithChildren {
    title: string;
}

export default function StyleguideSection({
    title,
    children,
}: StyleguideSectionProps) {
    return (
        <section className="mb-10">
            <Text
                as="h2"
                variant="subtitle"
                className="border-peach mb-4 border-b pb-2"
            >
                {title}
            </Text>
            {children}
        </section>
    );
}
