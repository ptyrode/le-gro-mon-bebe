type PregnancyStatus =
    | { kind: 'future' }
    | { kind: 'implausible'; days: number }
    | { kind: 'tooEarly'; days: number }
    | { kind: 'born'; daysSinceDue: number }
    | { kind: 'ongoing'; week: number };

type DateError = 'missing' | 'invalid' | 'future' | 'implausible';

interface Pregnancy {
    id: string;
    name: string;
    lastPeriodDate: string;
    category: CategoryKey;
    createdAt: string;
    closedAt?: string;
}

interface NotificationsState {
    enabled: boolean;
}

interface AppState {
    version: number;
    pregnancies: Pregnancy[];
    activeId: string;
    notifications: NotificationsState;
}
