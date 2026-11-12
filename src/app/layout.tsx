import '@/app/styles/globals.css';
import ServiceWorkerRegister from '@/components/common/ServiceWorkerRegister';
import { GTM_ID } from '@/constants/analytics';
import RootProvider from '@/contexts/RootProvider';
import { geistSans } from '@/fonts';
import { locale } from '@/i18n/request';
import { cn } from '@/utils/cn';
import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
        title: t('base.name'),
        description: t('base.description'),
        applicationName: t('base.name'),
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: t('base.name'),
        },
    };
}

export const viewport: Viewport = {
    themeColor: '#ff7a59',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang={locale}
            className={cn(geistSans.variable, 'h-full antialiased')}
        >
            <GoogleTagManager gtmId={GTM_ID} />
            <body className="min-h-full">
                <RootProvider>
                    {children}
                    <ServiceWorkerRegister />
                </RootProvider>
            </body>
        </html>
    );
}
