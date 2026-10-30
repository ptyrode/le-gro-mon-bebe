import animals from '@/data/categories/animals.json';
import cheeses from '@/data/categories/cheeses.json';
import desserts from '@/data/categories/desserts.json';
import fish from '@/data/categories/fish.json';
import fruits from '@/data/categories/fruits.json';
import fetalGrowthJson from '@/data/fetalGrowth.json';
import weightJokesJson from '@/data/weightJokes.json';
import type {
    Category,
    CategoryKey,
    FetalGrowth,
    WeightJokes,
} from '@/lib/types';

export const growth = fetalGrowthJson as unknown as FetalGrowth;
export const weightJokes = weightJokesJson as unknown as WeightJokes;

export const categories: Record<CategoryKey, Category> = {
    fruits: fruits as unknown as Category,
    fish: fish as unknown as Category,
    cheeses: cheeses as unknown as Category,
    animals: animals as unknown as Category,
    desserts: desserts as unknown as Category,
};

export const categoryList: Category[] = [
    categories.cheeses,
    categories.fish,
    categories.animals,
    categories.desserts,
    categories.fruits,
];
