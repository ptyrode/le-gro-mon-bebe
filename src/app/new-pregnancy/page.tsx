import DefaultLayout from '@/components/layouts/DefaultLayout';
import NewPregnancyPage from '@/components/pages/NewPregnancyPage/NewPregnancyPage';

export default function NewPregnancyPageDefault() {
    return (
        <DefaultLayout hasBottomNav={false}>
            <NewPregnancyPage />
        </DefaultLayout>
    );
}
