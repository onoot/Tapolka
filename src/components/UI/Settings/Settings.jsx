import React, {useState} from 'react';
import cl from "./Settings.module.css";
import clD from '../SettingParam/SettingParam.module.css';
import SettingParam from "../SettingParam/SettingParam";
import ButtonSettingBack from "../ButtonSettingBack/ButtonSettingBack";
import SettingMenu from "../SettingInput/SettingMenu";
import {logDOM} from "@testing-library/react";
import DeleteAccount from "../DeleteAccount/DeleteAccount";
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";





const Settings = ({visible, setVisible}) => {
    const [deleteAccount, setDeleteAccount]  = useState(false)

    const [settings, setSettings] = useState([
        {
            id:1, name: "Settings", isActive:true, visible: false, props:[
                {
                    id:1, name: "Select language", param: "English (US)", isInput: false
                },
                {
                    id:2, name: "Select Exchanger", param: "Binance", isInput: false
                },
            ]
        },
        {
            id: 2, name: "Select language", isActive: false, visible: false, props: [
                {
                    id: 1, name: "English (US)", isActive: true, isInput: true
                },
                {
                    id: 2, name: "English (UK)", isActive: false, isInput: true
                },
                {
                    id: 3, name: "Hindi", isActive: false, isInput: true
                },
                {
                    id: 4, name: "Spanish", isActive: false, isInput: true
                },
                {
                    id: 5, name: "French", isActive: false, isInput: true
                },
                {
                    id: 6, name: "Arabic", isActive: false, isInput: true
                },
                {
                    id: 7, name: "Bengali", isActive: false, isInput: true
                },
                {
                    id: 8, name: "Russian", isActive: false, isInput: true
                },
                {
                    id: 9, name: "Indonesia", isActive: false, isInput: true
                }
            ]
        },
        {
            id:3, name: "Select Exchanger", param: "", isActive:false, visible: false, props:[
                {
                    id:1, name: "Binance", isActive: true, isInput: true
                },
                {
                    id:2, name: "Telegram", isActive: false, isInput: true
                },
                {
                    id:3, name: "Telegram", isActive: false, isInput: true
                }
            ]
        }
    ])

    const rootClasses = [cl.settings__container]
    if(visible === true){
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(" ")}>
            <div className={cl.settings__container__titlePanel}>
                <ButtonSettingBack setVisible={setVisible} settings={settings} setSetting={setSettings}/>
                <div className={cl.settings__container__title}>
                    {(settings.filter(prop => prop.isActive).map(item => item.name))}
                </div>
            </div>
            <div className={cl.settings__container__settingBlock}>
                {(settings.filter(prop => prop.isActive).map(item => item.props))[0].map((prop) => {
                    return <SettingParam key={prop.id} param={prop} setSettings={setSettings}/>
                })}
                {settings[0].isActive ? <button onClick={() => setDeleteAccount(true)} className={`${clD.settingParam__container} ${clD.settingParam__container__delete}`}>
                    <div className={clD.settingParam__container__title}>
                        Delete Account
                    </div>
                </button> : ""}
                <DeleteAccount deleteAccount={deleteAccount} setDeleteAccount={setDeleteAccount}/>
            </div>
        </div>
    );
};

export default Settings;

