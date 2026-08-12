import { categories, growth, weightJokes } from '@/lib/data';
import type { CategoryItem, CategoryKey, GrowthWeek } from '@/lib/types';

export const MIN_WEEK = 4;
export const MAX_WEEK = 41;
export const TERM_DAYS = 280;
export const IMPLAUSIBLE_DAYS = 730;

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseISODate(iso: string): Date {
    return new Date(`${iso}T00:00:00`);
}

export function daysSince(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    const ddr = parseISODate(lastPeriodDate);
    return Math.floor((now.getTime() - ddr.getTime()) / MS_PER_DAY);
}

export function rawGestationalWeek(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return Math.floor(daysSince(lastPeriodDate, now) / 7);
}

export function clampWeek(week: number): number {
    return Math.min(MAX_WEEK, Math.max(MIN_WEEK, week));
}

export function gestationalAge(lastPeriodDate: string, now: Date = new Date()) {
    const days = Math.max(0, daysSince(lastPeriodDate, now));
    return { weeks: Math.floor(days / 7), days: days % 7, totalDays: days };
}

export function dueDate(lastPeriodDate: string): Date {
    const ddr = parseISODate(lastPeriodDate);
    return new Date(ddr.getTime() + TERM_DAYS * MS_PER_DAY);
}

export function daysUntilDue(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return TERM_DAYS - daysSince(lastPeriodDate, now);
}

export function progress(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    const days = daysSince(lastPeriodDate, now);
    return Math.min(1, Math.max(0, days / TERM_DAYS));
}

export type PregnancyStatus =
    | { kind: 'future' }
    | { kind: 'implausible'; days: number }
    | { kind: 'tooEarly'; days: number }
    | { kind: 'born'; daysSinceDue: number }
    | { kind: 'ongoing'; week: number };

export function pregnancyStatus(
    lastPeriodDate: string,
    now: Date = new Date()
): PregnancyStatus {
    const days = daysSince(lastPeriodDate, now);
    if (days < 0) return { kind: 'future' };
    if (days > IMPLAUSIBLE_DAYS) return { kind: 'implausible', days };

    const week = rawGestationalWeek(lastPeriodDate, now);
    if (week < MIN_WEEK) return { kind: 'tooEarly', days };
    if (week > MAX_WEEK) {
        return { kind: 'born', daysSinceDue: days - TERM_DAYS };
    }
    return { kind: 'ongoing', week };
}

export function validateLastPeriodDate(
    lastPeriodDate: string,
    now: Date = new Date()
): string | null {
    if (!lastPeriodDate) return 'Il me faut la date de tes dernières règles 🗓️';

    const parsed = parseISODate(lastPeriodDate);
    if (Number.isNaN(parsed.getTime())) return "Cette date n'est pas valide 🤔";

    const days = daysSince(lastPeriodDate, now);
    if (days < 0) return 'Cette date est dans le futur, ça coince un peu 😅';
    if (days > IMPLAUSIBLE_DAYS) {
        return 'Ça fait plus de deux ans… tu es sûre de la date ? 🤨';
    }
    return null;
}

export function growthForWeek(week: number): GrowthWeek | undefined {
    return growth.weeks[String(clampWeek(week))];
}

export function weightJokeForWeek(week: number): string | undefined {
    return weightJokes.weeks[String(clampWeek(week))];
}

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
