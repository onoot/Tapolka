import React from 'react';
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import cl from "../SettingParam/SettingParam.module.css";

const SettingMenu = ({name, param, setSettings}) => {
    const getCurrentLanguageName = () => {
        const currentLang = localStorage.getItem('language') || 'en';
        switch(currentLang) {
            case 'en': return 'English (US)';
            case 'ru': return 'Русский';
            case 'hi': return 'हिंदी';
            case 'es': return 'Español';
            case 'fr': return 'Français';
            case 'ar': return 'العربية';
            case 'bn': return 'বাংলা';
            case 'id': return 'Bahasa Indonesia';
            default: return 'English (US)';
        }
    };

    const displayParam = name === 'language' ? getCurrentLanguageName() : param;

    return (
        <button onClick={() => changeNavbarAndMine(setSettings, name)} className={`${cl.settingParam__container} ${cl.settingParam__container__in}`}>
            <div className={cl.settingParam__container__title}>
                {name}
            </div>
            <div className={cl.settingParam__container__param}>
                {displayParam}
            </div>
        </button>
    );
};

export default SettingMenu;