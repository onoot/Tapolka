import React from 'react';
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine";
import cl from "../SettingParam/SettingParam.module.css";

const SettingInput = ({param, setSettings}) => {
    // onClick={() => changeNavbarAndMine(setSettings, param.name)}
    return (
        <div  className={`${cl.settingParam__container} ${cl.settingParam__container__in}`}>
            <div className={cl.settingParam__container__title}>
                {param.name}
            </div>
            <div className={cl.settingParam__container__paramInput}>
                <input defaultChecked={param.isActive} name="language" type="radio"/>
            </div>
        </div>
    );
};

export default SettingInput;