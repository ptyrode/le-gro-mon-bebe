'use client';

import { categoryList } from '@/constants/data';
import { cn } from '@/utils/cn';
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
            <p className="text-ink mb-3 text-sm font-semibold">{label}</p>
            <div className="flex flex-wrap gap-2">
                {categoryList.map((cat) => {
                    const active = cat.key === category;
                    return (
                        <button
                            key={cat.key}
                            type="button"
                            onClick={() => {
                                track({
                                    event: 'category_change',
                                    category: cat.key,
                                    source,
                                });
                                onSetCategory(cat.key);
                            }}
                            className={cn(
                                'inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-base font-semibold transition',
                                active
                                    ? 'border-accent bg-accent text-white'
                                    : 'border-cream-deep text-ink hover:border-accent/50 bg-white'
                            )}
                        >
                            <span aria-hidden="true">{cat.emoji}</span>
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
