import React from 'react';
import cl from "../SettingParam/SettingParam.module.css";
import { useTranslation } from "../../../hooks/useTranslation";

const SettingInput = ({param, setSettings}) => {
    const { setLanguage } = useTranslation();
    
    const handleLanguageChange = () => {
        // Преобразуем имя параметра в код языка
        const langCode = getLangCode(param.name);
        if (langCode) {
            setLanguage(langCode);
        }
    };

    const getLangCode = (name) => {
        switch(name) {
            case 'English (US)': return 'en';
            case 'Русский': return 'ru';
            case 'हिंदी': return 'hi';
            case 'Español': return 'es';
            case 'Français': return 'fr';
            case 'العربية': return 'ar';
            case 'বাংলা': return 'bn';
            case 'Bahasa Indonesia': return 'id';
            default: return null;
        }
    };

    return (
        <div onClick={handleLanguageChange} className={`${cl.settingParam__container} ${cl.settingParam__container__in}`}>
            <div className={cl.settingParam__container__title}>
                {param.name}
            </div>
            <div className={cl.settingParam__container__paramInput}>
                <input 
                    checked={param.isActive}
                    onChange={handleLanguageChange}
                    name="language" 
                    type="radio"
                />
            </div>
        </div>
    );
};

export default SettingInput;