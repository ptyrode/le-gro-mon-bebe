import { STATE_VERSION } from '@/constants/storage';
import {
    IMPLAUSIBLE_DAYS,
    MAX_WEEK,
    MIN_WEEK,
    TERM_DAYS,
} from '@/constants/weeks';
import { getDaysSince } from '@/utils/date';

function generateId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function createPregnancy(
    lastPeriodDate: string,
    category: CategoryKey,
    name: string,
    createdAtISO: string
): Pregnancy {
    return {
        id: generateId(),
        name,
        lastPeriodDate,
        category,
        createdAt: createdAtISO,
    };
}

function createState(
    pregnancy: Pregnancy,
    notificationsEnabled = true
): AppState {
    return {
        version: STATE_VERSION,
        pregnancies: [pregnancy],
        activeId: pregnancy.id,
        notifications: { enabled: notificationsEnabled },
    };
}

function getOpenPregnancies(state: AppState): Pregnancy[] {
    return state.pregnancies.filter((p) => !p.closedAt);
}

function getRawGestationalWeek(
    lastPeriodDate: string,
    now: Date = new Date()
): number {
    return Math.floor(getDaysSince(lastPeriodDate, now) / 7);
}

function getPregnancyStatus(
    lastPeriodDate: string,
    now: Date = new Date()
): PregnancyStatus {
    const days = getDaysSince(lastPeriodDate, now);
    if (days < 0) return { kind: 'future' };
    if (days > IMPLAUSIBLE_DAYS) return { kind: 'implausible', days };

    const week = getRawGestationalWeek(lastPeriodDate, now);
    if (week < MIN_WEEK) return { kind: 'tooEarly', days };
    if (week > MAX_WEEK) {
        return { kind: 'born', daysSinceDue: days - TERM_DAYS };
    }
    return { kind: 'ongoing', week };
}

export { createPregnancy, createState, getOpenPregnancies, getPregnancyStatus };
