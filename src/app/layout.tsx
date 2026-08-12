import './globals.css';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { locale } from '@/i18n/request';
import type { Metadata, Viewport } from 'next';
import { Geist } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getTranslations } from 'next-intl/server';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations();
    return {
        title: t('app.name'),
        description: t('app.description'),
        applicationName: t('app.name'),
        appleWebApp: {
            capable: true,
            statusBarStyle: 'default',
            title: t('app.name'),
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
            className={`${geistSans.variable} h-full antialiased`}
        >
            <body className="min-h-full">
                <NextIntlClientProvider>
                    {children}
                    <ServiceWorkerRegister />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
