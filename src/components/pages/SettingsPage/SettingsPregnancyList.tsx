'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import SelectableCard from '@/components/ui/SelectableCard';
import Text from '@/components/ui/Text';
import { ICONS } from '@/constants/icons';
import usePregnancyLabel from '@/hooks/usePregnancyLabel';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface SettingsPregnancyListProps {
    state: AppState;
    onSelect: (id: string) => void;
    onAdd: () => void;
    onClose: (id: string) => void;
    onReopen: (id: string) => void;
    onRemove: (id: string) => void;
}

export default function SettingsPregnancyList({
    state,
    onSelect,
    onAdd,
    onClose,
    onReopen,
    onRemove,
}: SettingsPregnancyListProps) {
    const t = useTranslations();
    const label = usePregnancyLabel();
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    return (
        <Card
            className="mb-5"
            title={t('pages.settings.pregnancies.title')}
        >
            <ul className="mb-4 space-y-2">
                {state.pregnancies.map((p) => {
                    const shown = p.id === state.activeId;
                    return (
                        <li key={p.id}>
                            <SelectableCard
                                selected={shown}
                                onSelect={() => {
                                    setConfirmDeleteId(null);
                                    onSelect(p.id);
                                }}
                                footer={
                                    !shown ? null : confirmDeleteId === p.id ? (
                                        <>
                                            <Text
                                                variant="hint"
                                                className="mb-2"
                                            >
                                                {t(
                                                    'pages.settings.pregnancies.deleteConfirm'
                                                )}
                                            </Text>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    onClick={() =>
                                                        setConfirmDeleteId(null)
                                                    }
                                                >
                                                    {t('common.cta.cancel')}
                                                </Button>
                                                <Button
                                                    variant="error"
                                                    size="sm"
                                                    onClick={() => {
                                                        setConfirmDeleteId(
                                                            null
                                                        );
                                                        onRemove(p.id);
                                                    }}
                                                >
                                                    {t('common.cta.delete')}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() =>
                                                    p.closedAt
                                                        ? onReopen(p.id)
                                                        : onClose(p.id)
                                                }
                                            >
                                                {p.closedAt
                                                    ? t('common.cta.reopen')
                                                    : t('common.cta.close')}
                                            </Button>
                                            <Button
                                                variant="error"
                                                size="sm"
                                                onClick={() =>
                                                    setConfirmDeleteId(p.id)
                                                }
                                            >
                                                {t('common.cta.delete')}
                                            </Button>
                                        </div>
                                    )
                                }
                            >
                                <span className="flex items-baseline justify-between gap-2">
                                    <span className="text-chocolate truncate font-semibold">
                                        {label(p)}
                                    </span>
                                    <span className="text-taupe shrink-0 text-xs font-semibold">
                                        {p.closedAt
                                            ? t(
                                                  'pages.settings.pregnancies.closed'
                                              )
                                            : shown
                                              ? t(
                                                    'pages.settings.pregnancies.shown'
                                                )
                                              : null}
                                    </span>
                                </span>
                            </SelectableCard>
                        </li>
                    );
                })}
            </ul>
            <Button
                icon={ICONS.add}
                onClick={onAdd}
            >
                {t('common.cta.addPregnancy')}
            </Button>
        </Card>
    );
}
