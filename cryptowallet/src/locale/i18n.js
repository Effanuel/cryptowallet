import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const resources = {en: {translation: require('./messages_en.json')}};

i18n.use(initReactI18next).init({resources, lng: 'en', interpolation: {escapeValue: false}});
