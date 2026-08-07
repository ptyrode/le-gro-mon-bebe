import fetalGrowthJson from "@/data/fetalGrowth.json";
import fruits from "@/data/categories/fruits.json";
import poissons from "@/data/categories/poissons.json";
import fromages from "@/data/categories/fromages.json";
import animaux from "@/data/categories/animaux.json";
import type { Category, CategoryKey, FetalGrowth } from "@/lib/types";

export const growth = fetalGrowthJson as unknown as FetalGrowth;

export const categories: Record<CategoryKey, Category> = {
  fruits: fruits as unknown as Category,
  poissons: poissons as unknown as Category,
  fromages: fromages as unknown as Category,
  animaux: animaux as unknown as Category,
};

/** Liste ordonnée des catégories, pour l'affichage des choix. */
export const categoryList: Category[] = [
  categories.fruits,
  categories.poissons,
  categories.fromages,
  categories.animaux,
];
