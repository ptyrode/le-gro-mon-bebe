'use client';

import { categories } from '@/constants/data';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';

type ItemVisualSize = 'sm' | 'lg';

const SIZES: Record<
    ItemVisualSize,
    { pixels: number; image: string; emoji: string }
> = {
    sm: { pixels: 48, image: 'h-12 w-12', emoji: 'text-4xl' },
    lg: { pixels: 160, image: 'h-40 w-40', emoji: 'text-9xl' },
};

interface ItemVisualProps {
    category: CategoryKey;
    item: CategoryItem;
    size: ItemVisualSize;
    priority?: boolean;
    emojiClassName?: string;
    className?: string;
}

export default function ItemVisual({
    category,
    item,
    size,
    priority = false,
    emojiClassName = '',
    className = '',
}: ItemVisualProps) {
    const [hasImage, setHasImage] = useState(true);
    const { pixels, image, emoji } = SIZES[size];

    if (!hasImage) {
        return (
            <span className={cn(emoji, emojiClassName)}>
                {categories[category].emoji}
            </span>
        );
    }

    return (
        <Image
            src={`/images/${category}/${category}-${item.week}.webp`}
            alt={item.name}
            width={pixels}
            height={pixels}
            priority={priority}
            onError={() => setHasImage(false)}
            className={cn('rounded-xl object-cover', image, className)}
        />
    );
}
