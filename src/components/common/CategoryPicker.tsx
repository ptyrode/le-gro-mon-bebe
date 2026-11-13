'use client';

import Pill from '@/components/ui/Pill';
import Text from '@/components/ui/Text';
import { categoryList } from '@/constants/data';
import { track } from '@/utils/track';

interface CategoryPickerProps {
    className?: string;
    label: string;
    source: 'dashboard' | 'settings';
    category: CategoryKey;
    onSetCategory: (category: CategoryKey) => void;
}

export default function CategoryPicker({
    className,
    label,
    source,
    category,
    onSetCategory,
}: CategoryPickerProps) {
    return (
        <div className={className}>
            <Text
                variant="label"
                className="mb-3"
            >
                {label}
            </Text>
            <div className="flex flex-wrap gap-2">
                {categoryList.map((cat) => (
                    <Pill
                        key={cat.key}
                        active={cat.key === category}
                        icon={cat.emoji}
                        onClick={() => {
                            track({
                                event: 'category_change',
                                category: cat.key,
                                source,
                            });
                            onSetCategory(cat.key);
                        }}
                    >
                        {cat.label}
                    </Pill>
                ))}
            </div>
        </div>
    );
}
