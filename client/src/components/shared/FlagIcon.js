import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

export default (props) => {
    const { t } = useTranslation();
    const { lang } = props;
    const countryCode = lang === 'en' ? 'US' : lang.toUpperCase();

    return (
        <ReactCountryFlag
            countryCode={countryCode}
            title={t(`languages.${lang}`)}
            svg
        />
    )
}



