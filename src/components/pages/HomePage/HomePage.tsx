'use client';

import CategoryPicker from '@/components/common/CategoryPicker';
import InAppBrowserBanner from '@/components/common/InAppBrowserBanner';
import InstallBanner from '@/components/common/InstallBanner';
import HomeGrowthCard from '@/components/pages/HomePage/HomeGrowthCard';
import HomeHeader from '@/components/pages/HomePage/HomeHeader';
import HomeProgressCard from '@/components/pages/HomePage/HomeProgressCard';
import HomeStatusCard from '@/components/pages/HomePage/HomeStatusCard';
import { ROUTE_NEW_PREGNANCY } from '@/constants/routes';
import { MIN_WEEK } from '@/constants/weeks';
import usePregnancy from '@/hooks/usePregnancy';
import { getReferenceDate } from '@/utils/date';
import { getPregnancyStatus } from '@/utils/pregnancy';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ctaClassName =
    'bg-accent hover:bg-accent-deep mt-5 inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-base font-bold text-white transition';

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
                    emoji="🎀"
                    title={t('pages.home.closed.title')}
                    body={t('pages.home.closed.body')}
                >
                    <button
                        type="button"
                        onClick={() => router.push(ROUTE_NEW_PREGNANCY)}
                        className={ctaClassName}
                    >
                        <span aria-hidden="true">🤰</span>
                        {t('common.cta.newPregnancy')}
                    </button>
                </HomeStatusCard>
            ) : status.kind === 'born' ? (
                <HomeStatusCard
                    emoji="👶"
                    title={t('pages.home.born.title')}
                    body={t('pages.home.born.body', {
                        days: status.daysSinceDue,
                    })}
                >
                    <button
                        type="button"
                        onClick={() => close(active.id)}
                        className={ctaClassName}
                    >
                        <span aria-hidden="true">🎉</span>
                        {t('common.cta.babyBorn')}
                    </button>
                    <p className="text-ink-soft mt-4 text-sm">
                        {t('pages.home.born.hint')}
                    </p>
                </HomeStatusCard>
            ) : status.kind === 'future' || status.kind === 'implausible' ? (
                <HomeStatusCard
                    emoji="🤨"
                    title={t('pages.home.oddDate.title')}
                    body={t(`pages.home.oddDate.${status.kind}`)}
                />
            ) : status.kind === 'tooEarly' ? (
                <>
                    <HomeStatusCard
                        emoji="🌱"
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
