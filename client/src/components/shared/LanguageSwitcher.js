import React from "react";
import { OverlayTrigger, Button, Popover } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import FlagIcon from './FlagIcon';
import '../../styles/shared/languageSwitcher.less';

export default () => {
    const { i18n, t } = useTranslation();

    const handleSelect = value => {
        i18n.changeLanguage(value);
    }

    const langs = i18n.options.supportedLngs.filter(l => l !== i18n.language && l !== "cimode");

    const popover = (
        <Popover>
            <Popover.Body>
                <ul>
                    {
                        langs.map((lang, index) =>
                            <li key={index} onClick={() => handleSelect(lang)}>
                                <FlagIcon lang={lang}/>
                            </li>
                        )
                    }
                </ul>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger="click" placement="bottom" rootClose overlay={popover}>
            <Button variant="light" className='lang-switcher-btn'>
                <span>{t(`languages.${i18n.language}`)}</span>
                <FlagIcon lang={i18n.language}/>
            </Button>
        </OverlayTrigger>
    );
}