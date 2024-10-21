import React from 'react';
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import cl from "../SettingParam/SettingParam.module.css";

const SettingMenu = ({name, param, setSettings}) => {
    return (
        <button onClick={() => changeNavbarAndMine(setSettings, name)} className={`${cl.settingParam__container} ${cl.settingParam__container__in}`}>
            <div className={cl.settingParam__container__title}>
                {name}
            </div>
            <div className={cl.settingParam__container__param}>
                {param}

            </div>
        </button>
    );
};

export default SettingMenu;