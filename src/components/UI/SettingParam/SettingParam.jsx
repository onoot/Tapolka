import React from 'react';
import cl from './SettingParam.module.css';
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import SettingInput from "../SettingInput/SettingInput";
import SettingMenu from "../SettingInput/SettingMenu";

const SettingParam = ({param, setSettings}) => {
    return (
        <div className={cl.settingParam__container}>
            {
                param.isInput ? <SettingInput param={param} setSettings={setSettings}/> : <SettingMenu name={param.name} param={param.param} setSettings={setSettings}/>
            }
        </div>
    );
};

export default SettingParam;