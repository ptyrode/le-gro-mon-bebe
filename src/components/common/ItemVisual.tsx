'use client';

import { categories } from '@/constants/data';
import { cn } from '@/utils/cn';
import Image from 'next/image';
import { useState } from 'react';

interface ItemVisualProps {
    category: CategoryKey;
    item: CategoryItem;
    size: number;
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

    if (!hasImage) {
        return (
            <span
                className={emojiClassName}
                style={{ fontSize: size * 0.75 }}
            >
                {categories[category].emoji}
            </span>
        );
    }

    return (
        <Image
            src={`/images/${category}/${category}-${item.week}.webp`}
            alt={item.name}
            width={size}
            height={size}
            priority={priority}
            onError={() => setHasImage(false)}
            style={{ width: size, height: size }}
            className={cn('rounded-xl object-cover', className)}
        />
    );
}
