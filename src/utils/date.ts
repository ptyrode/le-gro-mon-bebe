import { MS_PER_DAY } from '@/constants/date';
import { IMPLAUSIBLE_DAYS, TERM_DAYS } from '@/constants/weeks';

function getTodayISO(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${now.getFullYear()}-${month}-${day}`;
}

function parseISODate(iso: string): Date {
    return new Date(`${iso}T00:00:00`);
}

function getDaysSince(lastPeriodDate: string, now: Date = new Date()): number {
    const ddr = parseISODate(lastPeriodDate);
    return Math.floor((now.getTime() - ddr.getTime()) / MS_PER_DAY);
}

function getDueDate(lastPeriodDate: string): Date {
    const date = parseISODate(lastPeriodDate);
    date.setDate(date.getDate() + TERM_DAYS);
    return date;
}

function getDaysUntilDue(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return TERM_DAYS - getDaysSince(lastPeriodDate, now);
}

function getGestationalAge(lastPeriodDate: string, now: Date = new Date()) {
    const days = Math.max(0, getDaysSince(lastPeriodDate, now));
    return { weeks: Math.floor(days / 7), days: days % 7, totalDays: days };
}

function getProgress(lastPeriodDate: string, now: Date = new Date()): number {
    const days = getDaysSince(lastPeriodDate, now);
    return Math.min(1, Math.max(0, days / TERM_DAYS));
}

function formatDueDate(lastPeriodDate: string): string {
    return getDueDate(lastPeriodDate).toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function formatShortDueDate(lastPeriodDate: string): string {
    return getDueDate(lastPeriodDate).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

function getReferenceDate(pregnancy: Pregnancy): Date {
    return pregnancy.closedAt ? new Date(pregnancy.closedAt) : new Date();
}

function validateLastPeriodDate(
    lastPeriodDate: string,
    now: Date = new Date()
): DateError | null {
    if (!lastPeriodDate) return 'missing';

    const parsed = parseISODate(lastPeriodDate);
    if (Number.isNaN(parsed.getTime())) return 'invalid';

    const days = getDaysSince(lastPeriodDate, now);
    if (days < 0) return 'future';
    if (days > IMPLAUSIBLE_DAYS) return 'implausible';
    return null;
}

export {
    formatDueDate,
    formatShortDueDate,
    getDaysSince,
    getDaysUntilDue,
    getDueDate,
    getGestationalAge,
    getProgress,
    getReferenceDate,
    getTodayISO,
    parseISODate,
    validateLastPeriodDate,
};
