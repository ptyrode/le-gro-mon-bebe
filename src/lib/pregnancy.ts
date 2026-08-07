import { categories, growth } from '@/lib/data';
import type { CategoryItem, CategoryKey, GrowthWeek } from '@/lib/types';

export const MIN_WEEK = 4;
export const MAX_WEEK = 40;
export const TERM_DAYS = 280; // 40 semaines d'aménorrhée

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Parse une date ISO yyyy-mm-dd en date locale à minuit. */
function parseISODate(iso: string): Date {
    return new Date(`${iso}T00:00:00`);
}

/** Nombre de jours écoulés depuis la DDR. */
export function daysSince(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    const ddr = parseISODate(lastPeriodDate);
    return Math.floor((now.getTime() - ddr.getTime()) / MS_PER_DAY);
}

/** Semaine d'aménorrhée (SA) brute, non bornée. */
export function rawGestationalWeek(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return Math.floor(daysSince(lastPeriodDate, now) / 7);
}

/** Semaine affichable, bornée entre MIN_WEEK et MAX_WEEK. */
export function clampWeek(week: number): number {
    return Math.min(MAX_WEEK, Math.max(MIN_WEEK, week));
}

/** Détail SA : semaines pleines + jours (ex: 24 SA + 3j). */
export function gestationalAge(lastPeriodDate: string, now: Date = new Date()) {
    const days = Math.max(0, daysSince(lastPeriodDate, now));
    return { weeks: Math.floor(days / 7), days: days % 7, totalDays: days };
}

/** Date prévue d'accouchement (DDR + 280 jours). */
export function dueDate(lastPeriodDate: string): Date {
    const ddr = parseISODate(lastPeriodDate);
    return new Date(ddr.getTime() + TERM_DAYS * MS_PER_DAY);
}

/** Jours restants avant le terme (peut être négatif si dépassé). */
export function daysUntilDue(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return TERM_DAYS - daysSince(lastPeriodDate, now);
}

/** Progression 0 → 1 sur l'ensemble de la grossesse. */
export function progress(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    const days = daysSince(lastPeriodDate, now);
    return Math.min(1, Math.max(0, days / TERM_DAYS));
}

/** Données de croissance pour une semaine (bornée). */
export function growthForWeek(week: number): GrowthWeek | undefined {
    return growth.weeks[String(clampWeek(week))];
}

/**
 * Équivalence de comparaison pour une semaine donnée.
 * On prend l'item dont la semaine est la plus grande sans dépasser `week`.
 * Avant la 1re semaine référencée, on renvoie le premier item.
 */
export function equivalenceForWeek(
    category: CategoryKey,
    week: number
): CategoryItem {
    const items = categories[category].items;
    const w = clampWeek(week);
    let match = items[0];
    for (const item of items) {
        if (item.week <= w) match = item;
        else break;
    }
    return match;
}
