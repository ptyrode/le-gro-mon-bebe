'use client';

import StyleguideSample from '@/components/pages/StyleguidePage/StyleguideSample';
import StyleguideSection from '@/components/pages/StyleguidePage/StyleguideSection';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Field from '@/components/ui/Field';
import Pill from '@/components/ui/Pill';
import SelectableCard from '@/components/ui/SelectableCard';
import Switch from '@/components/ui/Switch';
import Text from '@/components/ui/Text';
import { categoryList } from '@/constants/data';
import { ICONS } from '@/constants/icons';
import { cn } from '@/utils/cn';
import { useTranslations } from 'next-intl';
import { type ComponentProps, useState } from 'react';

const COLORS = [
    { token: 'cream', className: 'bg-cream' },
    { token: 'peach', className: 'bg-peach' },
    { token: 'chocolate', className: 'bg-chocolate' },
    { token: 'taupe', className: 'bg-taupe' },
    { token: 'coral', className: 'bg-coral' },
    { token: 'terracotta', className: 'bg-terracotta' },
    { token: 'raspberry', className: 'bg-raspberry' },
    { token: 'lemon', className: 'bg-lemon' },
];

const TEXT_VARIANTS: NonNullable<ComponentProps<typeof Text>['variant']>[] = [
    'display',
    'headline',
    'title',
    'subtitle',
    'body',
    'label',
    'caption',
    'hint',
    'fun',
    'error',
];

const CARD_VARIANTS: NonNullable<ComponentProps<typeof Card>['variant']>[] = [
    'default',
    'info',
    'error',
];

const BUTTONS: (ComponentProps<typeof Button> & { labelKey: string })[] = [
    {
        variant: 'primary',
        icon: ICONS.add,
        labelKey: 'common.cta.addPregnancy',
    },
    {
        variant: 'secondary',
        icon: ICONS.idea,
        labelKey: 'common.cta.suggestIdea',
    },
    {
        variant: 'tertiary',
        icon: ICONS.support,
        labelKey: 'common.cta.support',
    },
    { variant: 'error', labelKey: 'common.cta.delete' },
    { variant: 'primary', labelKey: 'common.cta.install' },
    { variant: 'secondary', size: 'sm', labelKey: 'common.cta.close' },
    { variant: 'error', size: 'sm', labelKey: 'common.cta.delete' },
];

function toCode(component: string, props: object) {
    const attributes = Object.entries(props)
        .filter(([, value]) =>
            ['string', 'number', 'boolean'].includes(typeof value)
        )
        .filter(([, value]) => value !== false)
        .map(([key, value]) => (value === true ? key : `${key}="${value}"`));
    return `<${[component, ...attributes].join(' ')}>`;
}

export default function StyleguidePage() {
    const t = useTranslations();
    const [selectedCard, setSelectedCard] = useState<CategoryKey>('cheeses');
    const [pillCategory, setPillCategory] = useState<CategoryKey>('cheeses');
    const [pillName, setPillName] = useState<'first' | 'second'>('first');
    const [notifications, setNotifications] = useState(true);
    const badges: (ComponentProps<typeof Badge> & { label: string })[] = [
        { variant: 'primary', label: t('pages.timeline.current') },
        {
            variant: 'secondary',
            label: t('common.unit.ageWithDays', { weeks: 24, days: 3 }),
        },
    ];
    const fields: ComponentProps<typeof Field>[] = [
        {
            id: 'styleguide-name',
            type: 'text',
            label: t('forms.fields.name.labelOptional'),
            placeholder: t('forms.fields.name.placeholder'),
        },
        {
            id: 'styleguide-date',
            type: 'date',
            label: t('forms.fields.lastPeriodDate.label'),
            hint: t('forms.fields.lastPeriodDate.hint'),
        },
        {
            id: 'styleguide-date-error',
            type: 'date',
            label: t('forms.fields.lastPeriodDate.settingsLabel'),
            error: t('forms.error.lastPeriodDate.future'),
        },
    ];
    const switchProps = {
        id: 'styleguide-switch',
        label: t('pages.settings.notifications.title'),
        hint: t('pages.settings.notifications.hint'),
        checked: notifications,
    };

    return (
        <div className="mx-auto w-full max-w-md px-5 pt-8 pb-16">
            <header className="mb-8">
                <Text
                    as="h1"
                    variant="display"
                >
                    {t('pages.styleguide.title')}
                </Text>
                <Text className="mt-2">{t('pages.styleguide.intro')}</Text>
            </header>
            <StyleguideSection title={t('pages.styleguide.colors.title')}>
                <ul className="grid grid-cols-2 gap-3">
                    {COLORS.map(({ token, className }) => (
                        <li
                            key={token}
                            className="flex items-center gap-3"
                        >
                            <span
                                className={cn(
                                    'border-peach h-12 w-12 shrink-0 rounded-xl border-2',
                                    className
                                )}
                            />
                            <span className="min-w-0">
                                <code className="text-chocolate block font-mono text-xs font-semibold">
                                    {token}
                                </code>
                                <Text
                                    as="span"
                                    variant="hint"
                                    className="block"
                                >
                                    {t(`pages.styleguide.colors.${token}`)}
                                </Text>
                            </span>
                        </li>
                    ))}
                </ul>
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.typography.title')}>
                {TEXT_VARIANTS.map((variant) => (
                    <StyleguideSample
                        key={variant}
                        code={toCode('Text', { variant })}
                    >
                        <Text variant={variant}>
                            {t(
                                `pages.styleguide.typography.variants.${variant}`
                            )}
                        </Text>
                    </StyleguideSample>
                ))}
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.icons.title')}>
                <ul className="grid grid-cols-2 gap-3">
                    {Object.entries(ICONS).map(([key, icon]) => (
                        <li
                            key={key}
                            className="flex items-center gap-3"
                        >
                            <span
                                aria-hidden="true"
                                className="w-10 shrink-0 text-center text-3xl"
                            >
                                {icon}
                            </span>
                            <span className="min-w-0">
                                <code className="text-chocolate block font-mono text-xs font-semibold">
                                    {key}
                                </code>
                                <Text
                                    as="span"
                                    variant="hint"
                                    className="block"
                                >
                                    {t(`pages.styleguide.icons.items.${key}`)}
                                </Text>
                            </span>
                        </li>
                    ))}
                </ul>
                <Text
                    variant="hint"
                    className="mt-5 mb-3"
                >
                    {t('pages.styleguide.icons.categories')}
                </Text>
                <ul className="grid grid-cols-2 gap-3">
                    {categoryList.map((cat) => (
                        <li
                            key={cat.key}
                            className="flex items-center gap-3"
                        >
                            <span
                                aria-hidden="true"
                                className="w-10 shrink-0 text-center text-3xl"
                            >
                                {cat.emoji}
                            </span>
                            <span className="min-w-0">
                                <code className="text-chocolate block font-mono text-xs font-semibold">
                                    {cat.key}
                                </code>
                                <Text
                                    as="span"
                                    variant="hint"
                                    className="block"
                                >
                                    {cat.label}
                                </Text>
                            </span>
                        </li>
                    ))}
                </ul>
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.cards.title')}>
                {CARD_VARIANTS.map((variant) => {
                    const props = {
                        variant,
                        title: t(`pages.styleguide.cards.${variant}.title`),
                        hint: t(`pages.styleguide.cards.${variant}.body`),
                    };
                    return (
                        <StyleguideSample
                            key={variant}
                            code={toCode('Card', props)}
                        >
                            <Card {...props} />
                        </StyleguideSample>
                    );
                })}
                <StyleguideSample
                    code={toCode('SelectableCard', { selected: true })}
                >
                    <div className="grid grid-cols-2 gap-3">
                        {categoryList.slice(0, 2).map((cat) => (
                            <SelectableCard
                                key={cat.key}
                                selected={cat.key === selectedCard}
                                onSelect={() => setSelectedCard(cat.key)}
                            >
                                <Text variant="label">{cat.label}</Text>
                            </SelectableCard>
                        ))}
                    </div>
                </StyleguideSample>
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.buttons.title')}>
                {BUTTONS.map(({ labelKey, ...props }) => (
                    <StyleguideSample
                        key={`${props.variant}-${props.size}-${labelKey}`}
                        code={toCode('Button', props)}
                    >
                        <Button {...props}>{t(labelKey)}</Button>
                    </StyleguideSample>
                ))}
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.badges.title')}>
                {badges.map(({ label, ...props }) => (
                    <StyleguideSample
                        key={props.variant}
                        code={toCode('Badge', props)}
                    >
                        <Badge {...props}>{label}</Badge>
                    </StyleguideSample>
                ))}
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.pills.title')}>
                <StyleguideSample
                    code={toCode('Pill', {
                        active: true,
                        icon: categoryList[0].emoji,
                    })}
                >
                    <div className="flex flex-wrap gap-2">
                        {categoryList.map((cat) => (
                            <Pill
                                key={cat.key}
                                active={cat.key === pillCategory}
                                icon={cat.emoji}
                                onClick={() => setPillCategory(cat.key)}
                            >
                                {cat.label}
                            </Pill>
                        ))}
                    </div>
                </StyleguideSample>
                <StyleguideSample code={toCode('Pill', { active: true })}>
                    <div className="flex flex-wrap gap-2">
                        {(['first', 'second'] as const).map((name) => (
                            <Pill
                                key={name}
                                active={name === pillName}
                                onClick={() => setPillName(name)}
                            >
                                {t(`pages.styleguide.pills.${name}`)}
                            </Pill>
                        ))}
                    </div>
                </StyleguideSample>
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.fields.title')}>
                {fields.map(({ id, ...props }) => (
                    <StyleguideSample
                        key={id}
                        code={toCode('Field', props)}
                    >
                        <Field
                            id={id}
                            {...props}
                        />
                    </StyleguideSample>
                ))}
            </StyleguideSection>
            <StyleguideSection title={t('pages.styleguide.switch.title')}>
                <StyleguideSample code={toCode('Switch', switchProps)}>
                    <Card>
                        <Switch
                            {...switchProps}
                            onClick={() => setNotifications(!notifications)}
                        />
                    </Card>
                </StyleguideSample>
            </StyleguideSection>
        </div>
    );
}
