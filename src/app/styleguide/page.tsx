import DefaultLayout from '@/components/layouts/DefaultLayout';
import StyleguidePage from '@/components/pages/StyleguidePage/StyleguidePage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function StyleguidePageDefault() {
    return (
        <DefaultLayout
            hasBottomNav={false}
            requiresPregnancy={false}
        >
            <StyleguidePage />
        </DefaultLayout>
    );
}
