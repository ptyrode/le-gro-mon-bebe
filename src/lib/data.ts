import animals from '@/data/categories/animals.json';
import cheeses from '@/data/categories/cheeses.json';
import fish from '@/data/categories/fish.json';
import fruits from '@/data/categories/fruits.json';
import fetalGrowthJson from '@/data/fetalGrowth.json';
import type { Category, CategoryKey, FetalGrowth } from '@/lib/types';

export const growth = fetalGrowthJson as unknown as FetalGrowth;

export const categories: Record<CategoryKey, Category> = {
    fruits: fruits as unknown as Category,
    fish: fish as unknown as Category,
    cheeses: cheeses as unknown as Category,
    animals: animals as unknown as Category,
};

/** Liste ordonnée des catégories, pour l'affichage des choix. */
export const categoryList: Category[] = [
    categories.fruits,
    categories.fish,
    categories.cheeses,
    categories.animals,
];
