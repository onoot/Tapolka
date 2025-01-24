import React, {useState} from 'react';
import cl from "./Settings.module.css";
import clD from '../SettingParam/SettingParam.module.css';
import SettingParam from "../SettingParam/SettingParam";
import ButtonSettingBack from "../ButtonSettingBack/ButtonSettingBack";
import SettingMenu from "../SettingInput/SettingMenu";
import {logDOM} from "@testing-library/react";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import { useTranslation } from "../../../hooks/useTranslation";





const Settings = ({visible, setVisible}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    const [deleteAccount, setDeleteAccount] = useState(false);

    // Функция для определения активного языка
    const isActiveLanguage = (langOption) => {
        switch(language) {
            case 'en': return langOption === 'en_us';
            case 'ru': return langOption === 'ru';
            case 'hi': return langOption === 'hi';
            case 'es': return langOption === 'es';
            case 'fr': return langOption === 'fr';
            case 'ar': return langOption === 'ar';
            case 'bn': return langOption === 'bn';
            case 'id': return langOption === 'id';
            default: return false;
        }
    };

    const [settings, setSettings] = useState([
        {
            id:1, name: t('Settings.title'), isActive:true, visible: false, props:[
                {
                    id:1, name: t('Settings.language.title'), param: t('Settings.language.options.en_us'), isInput: false
                },
                {
                    id:2, name: t('Settings.exchanger.title'), param: t('Settings.exchanger.options.binance'), isInput: false
                },
            ]
        },
        {
            id: 2, name: t('Settings.language.title'), isActive: false, visible: false, props: [
                {
                    id: 1, name: t('Settings.language.options.en_us'), isActive: isActiveLanguage('en_us'), isInput: true
                },
                {
                    id: 2, name: t('Settings.language.options.en_uk'), isActive: false, isInput: true
                },
                {
                    id: 3, name: t('Settings.language.options.hi'), isActive: false, isInput: true
                },
                {
                    id: 4, name: t('Settings.language.options.es'), isActive: false, isInput: true
                },
                {
                    id: 5, name: t('Settings.language.options.fr'), isActive: false, isInput: true
                },
                {
                    id: 6, name: t('Settings.language.options.ar'), isActive: false, isInput: true
                },
                {
                    id: 7, name: t('Settings.language.options.bn'), isActive: false, isInput: true
                },
                {
                    id: 8, name: t('Settings.language.options.ru'), isActive: isActiveLanguage('ru'), isInput: true
                },
                {
                    id: 9, name: t('Settings.language.options.id'), isActive: false, isInput: true
                }
            ]
        },
        {
            id:3, name: t('Settings.exchanger.title'), param: "", isActive:false, visible: false, props:[
                {
                    id:1, name: t('Settings.exchanger.options.binance'), isActive: true, isInput: true
                },
                {
                    id:2, name: t('Settings.exchanger.options.telegram'), isActive: false, isInput: true
                },
            ]
        }
    ])

    const handleClose = () => {
        setVisible(false);
        // Сбрасываем состояние до начального
        setSettings(prev => prev.map(section => ({
            ...section,
            isActive: section.id === 1
        })));
    };

    const rootClasses = [cl.settings__container]
    if(visible === true){
        rootClasses.push(cl.active)
    }

    // Если компонент не видим, не рендерим его содержимое
    if (!visible) {
        return null;
    }

    const activeSection = settings.find(prop => prop.isActive);
    
    return (
        <div className={rootClasses.join(" ")}>
            <div className={cl.settings__container__titlePanel}>
                <ButtonSettingBack setVisible={handleClose} settings={settings} setSetting={setSettings}/>
                <div className={cl.settings__container__title}>
                    {activeSection?.name || t('Settings.title')}
                </div>
            </div>
            <div className={cl.settings__container__settingBlock}>
                {activeSection?.props?.map((prop) => {
                    return <SettingParam key={prop.id} param={prop} setSettings={setSettings}/>
                })}
                {settings[0].isActive && (
                    <button onClick={() => setDeleteAccount(true)} className={`${clD.settingParam__container} ${clD.settingParam__container__delete}`}>
                        <div className={clD.settingParam__container__title}>
                            {t('Settings.deleteAccount')}
                        </div>
                    </button>
                )}
                <DeleteAccount deleteAccount={deleteAccount} setDeleteAccount={setDeleteAccount}/>
            </div>
        </div>
    );
};

export default Settings;

