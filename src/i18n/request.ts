import { getRequestConfig } from 'next-intl/server';

export const locale = 'fr';

export default getRequestConfig(async () => ({
    locale,
    messages: (await import(`../../public/locales/${locale}/translations.json`))
        .default,
}));
