import { createI18n } from 'vue-i18n';
import ar from './locales/ar';
import en from './locales/en';
const messages = {
    en,
    ar,
};

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages,
});

export default i18n;
