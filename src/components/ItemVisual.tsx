'use client';

import type { CategoryItem, CategoryKey } from '@/lib/types';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
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
}: Props) {
    const [illustre, setIllustre] = useState(true);

    if (!illustre) {
        return (
            <span
                className={emojiClassName}
                style={{ fontSize: size * 0.75 }}
            >
                {item.emoji}
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
            onError={() => setIllustre(false)}
            style={{ width: size, height: size }}
            className={`rounded-xl object-cover ${className}`}
        />
    );
}
