'use client';

import CategoryPicker from '@/components/common/CategoryPicker';
import InAppBrowserBanner from '@/components/common/InAppBrowserBanner';
import InstallBanner from '@/components/common/InstallBanner';
import HomeGrowthCard from '@/components/pages/HomePage/HomeGrowthCard';
import HomeHeader from '@/components/pages/HomePage/HomeHeader';
import HomeProgressCard from '@/components/pages/HomePage/HomeProgressCard';
import HomeStatusCard from '@/components/pages/HomePage/HomeStatusCard';
import Button from '@/components/ui/Button';
import Text from '@/components/ui/Text';
import { ICONS } from '@/constants/icons';
import { ROUTE_NEW_PREGNANCY } from '@/constants/routes';
import { MIN_WEEK } from '@/constants/weeks';
import usePregnancy from '@/hooks/usePregnancy';
import { getReferenceDate } from '@/utils/date';
import { getPregnancyStatus } from '@/utils/pregnancy';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations();
    const router = useRouter();
    const { state, active, select, setCategory, close } = usePregnancy();

    if (!state || !active) return null;

    const { lastPeriodDate, category } = active;
    const status = getPregnancyStatus(lastPeriodDate, getReferenceDate(active));
    const categoryPicker = (
        <CategoryPicker
            className="mt-6"
            label={t('pages.home.compareIn')}
            source="dashboard"
            category={category}
            onSetCategory={setCategory}
        />
    );

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-28">
            <HomeHeader
                state={state}
                pregnancy={active}
                onSelect={select}
            />
            {active.closedAt ? (
                <HomeStatusCard
                    emoji={ICONS.closed}
                    title={t('pages.home.closed.title')}
                    body={t('pages.home.closed.body')}
                >
                    <Button
                        icon={ICONS.pregnancy}
                        className="mt-5"
                        onClick={() => router.push(ROUTE_NEW_PREGNANCY)}
                    >
                        {t('common.cta.newPregnancy')}
                    </Button>
                </HomeStatusCard>
            ) : status.kind === 'born' ? (
                <HomeStatusCard
                    emoji={ICONS.bornStatus}
                    title={t('pages.home.born.title')}
                    body={t('pages.home.born.body', {
                        days: status.daysSinceDue,
                    })}
                >
                    <Button
                        icon={ICONS.born}
                        className="mt-5"
                        onClick={() => close(active.id)}
                    >
                        {t('common.cta.babyBorn')}
                    </Button>
                    <Text
                        variant="caption"
                        className="mt-4"
                    >
                        {t('pages.home.born.hint')}
                    </Text>
                </HomeStatusCard>
            ) : status.kind === 'future' || status.kind === 'implausible' ? (
                <HomeStatusCard
                    emoji={ICONS.oddDate}
                    title={t('pages.home.oddDate.title')}
                    body={t(`pages.home.oddDate.${status.kind}`)}
                />
            ) : status.kind === 'tooEarly' ? (
                <>
                    <HomeStatusCard
                        emoji={ICONS.tooEarly}
                        title={t('pages.home.tooEarly.title')}
                        body={t('pages.home.tooEarly.body', {
                            week: MIN_WEEK,
                        })}
                    />
                    {categoryPicker}
                </>
            ) : (
                <>
                    <HomeGrowthCard
                        category={category}
                        week={status.week}
                    />
                    <HomeProgressCard
                        lastPeriodDate={lastPeriodDate}
                        week={status.week}
                    />
                    {categoryPicker}
                    <InAppBrowserBanner className="mt-6" />
                    <InstallBanner />
                </>
            )}
        </div>
    );
}
