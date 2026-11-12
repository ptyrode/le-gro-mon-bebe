import PushSyncProvider from '@/contexts/PushSyncProvider';
import { NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren } from 'react';

export default function RootProvider({ children }: PropsWithChildren) {
    return (
        <NextIntlClientProvider>
            <PushSyncProvider>{children}</PushSyncProvider>
        </NextIntlClientProvider>
    );
}
