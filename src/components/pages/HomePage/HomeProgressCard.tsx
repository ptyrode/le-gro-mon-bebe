'use client';

import { MAX_WEEK } from '@/constants/weeks';
import { formatDueDate, getDaysUntilDue, getProgress } from '@/utils/date';
import { useTranslations } from 'next-intl';

interface HomeProgressCardProps {
    lastPeriodDate: string;
    week: number;
}

export default function HomeProgressCard({
    lastPeriodDate,
    week,
}: HomeProgressCardProps) {
    const t = useTranslations();
    const percent = Math.round(getProgress(lastPeriodDate) * 100);
    const daysLeft = getDaysUntilDue(lastPeriodDate);

    return (
        <section className="mt-6 rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-ink font-semibold">
                    {t('pages.home.week', { week, max: MAX_WEEK })}
                </span>
                <span className="text-ink-soft">
                    {daysLeft > 0
                        ? t('pages.home.daysLeft', { days: daysLeft })
                        : daysLeft === 0
                          ? t('pages.home.dueToday')
                          : t('pages.home.overdue', { days: -daysLeft })}
                </span>
            </div>
            <div className="bg-cream-deep h-3 w-full overflow-hidden rounded-full">
                <div
                    className="bg-accent h-full rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="text-ink-soft mt-3 text-center text-sm">
                {t('common.pregnancy.dueDate', {
                    date: formatDueDate(lastPeriodDate),
                })}
            </p>
        </section>
    );
}
