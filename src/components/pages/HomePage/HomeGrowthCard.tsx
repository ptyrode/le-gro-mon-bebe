'use client';

import ItemVisual from '@/components/common/ItemVisual';
import Card from '@/components/ui/Card';
import Text from '@/components/ui/Text';
import {
    formatWeight,
    getEquivalenceForWeek,
    getGrowthForWeek,
    getWeightJokeForWeek,
} from '@/utils/growth';
import { track } from '@/utils/track';
import { useTranslations } from 'next-intl';

interface HomeGrowthCardProps {
    category: CategoryKey;
    week: number;
}

export default function HomeGrowthCard({
    category,
    week,
}: HomeGrowthCardProps) {
    const t = useTranslations();
    const item = getEquivalenceForWeek(category, week);
    const growth = getGrowthForWeek(week);
    const joke = getWeightJokeForWeek(week);
    const weight = growth ? formatWeight(growth.weight) : null;

    return (
        <Card className="text-center">
            <ItemVisual
                category={category}
                item={item}
                size="lg"
                priority
                className="mx-auto mb-4"
                emojiClassName="mb-4 block leading-none"
            />
            {growth && (
                <Text variant="title">
                    {t('pages.home.size', {
                        size: growth.size.toLocaleString('fr-FR'),
                    })}
                </Text>
            )}
            <Text className="mt-1">
                {t.rich('pages.home.sizeEquivalent', {
                    name: item.name,
                    item: (chunks) =>
                        item.wikipedia ? (
                            <a
                                href={item.wikipedia}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() =>
                                    track({
                                        event: 'wikipedia_click',
                                        category,
                                        week,
                                        item: item.name,
                                    })
                                }
                                className="text-chocolate decoration-coral hover:text-terracotta font-bold underline decoration-2 underline-offset-4 transition"
                            >
                                {chunks}
                                <span className="sr-only">
                                    {t('pages.home.wikipediaHint')}
                                </span>
                            </a>
                        ) : (
                            <span className="text-chocolate font-bold">
                                {chunks}
                            </span>
                        ),
                })}
            </Text>
            <Text
                variant="fun"
                className="mt-3"
            >
                {item.funText}
            </Text>
            {weight && (
                <div className="border-peach mt-6 border-t pt-5">
                    <Text variant="title">
                        {t('pages.home.weight', {
                            weight: t(`common.unit.${weight.unit}`, weight),
                        })}
                    </Text>
                    {joke && (
                        <Text
                            variant="fun"
                            className="mt-3"
                        >
                            {joke}
                        </Text>
                    )}
                </div>
            )}
        </Card>
    );
}
