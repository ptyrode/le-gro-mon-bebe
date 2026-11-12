'use client';

import ItemVisual from '@/components/common/ItemVisual';
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
        <section className="shadow-accent/10 rounded-3xl bg-white p-6 text-center shadow-lg">
            <ItemVisual
                category={category}
                item={item}
                size={160}
                priority
                className="mx-auto mb-4"
                emojiClassName="mb-4 block leading-none"
            />
            {growth && (
                <p className="text-ink text-xl font-extrabold">
                    {t('pages.home.size', {
                        size: growth.size.toLocaleString('fr-FR'),
                    })}
                </p>
            )}
            <p className="text-ink-soft mt-1">
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
                                className="text-ink decoration-accent hover:text-accent-deep font-bold underline decoration-2 underline-offset-4 transition"
                            >
                                {chunks}
                                <span className="sr-only">
                                    {t('pages.home.wikipediaHint')}
                                </span>
                            </a>
                        ) : (
                            <span className="text-ink font-bold">{chunks}</span>
                        ),
                })}
            </p>
            <p className="text-ink-soft mt-3 text-sm italic">{item.funText}</p>
            {weight && (
                <div className="border-cream-deep mt-6 border-t pt-5">
                    <p className="text-ink text-xl font-extrabold">
                        {t('pages.home.weight', {
                            weight: t(`common.unit.${weight.unit}`, weight),
                        })}
                    </p>
                    {joke && (
                        <p className="text-ink-soft mt-3 text-sm italic">
                            {joke}
                        </p>
                    )}
                </div>
            )}
        </section>
    );
}
