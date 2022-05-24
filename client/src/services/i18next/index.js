import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from './resources';

i18next
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        supportedLngs: ["en", "ru", "ua"],
        fallbackLng: "en",
        debug: process.env.NODE_ENV === "development",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18next;
