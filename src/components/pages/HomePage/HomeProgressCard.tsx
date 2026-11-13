'use client';

import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
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
        <Card className="mt-6">
            <div className="mb-2 flex items-center justify-between">
                <Text
                    as="span"
                    id="progress-label"
                    variant="label"
                >
                    {t('pages.home.week', { week, max: MAX_WEEK })}
                </Text>
                <Text
                    as="span"
                    variant="caption"
                >
                    {daysLeft > 0
                        ? t('pages.home.daysLeft', { days: daysLeft })
                        : daysLeft === 0
                          ? t('pages.home.dueToday')
                          : t('pages.home.overdue', { days: -daysLeft })}
                </Text>
            </div>
            <progress
                value={percent}
                max={100}
                aria-labelledby="progress-label"
                className="bg-peach [&::-webkit-progress-bar]:bg-peach [&::-webkit-progress-value]:bg-coral [&::-moz-progress-bar]:bg-coral block h-3 w-full appearance-none overflow-hidden rounded-full border-0 [&::-moz-progress-bar]:rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-value]:rounded-full"
            />
            <Text
                variant="caption"
                className="mt-3 text-center"
            >
                {t('common.pregnancy.dueDate', {
                    date: formatDueDate(lastPeriodDate),
                })}
            </Text>
        </Card>
    );
}
