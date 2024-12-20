import React from 'react';
import Clicker from "../Clicker/Clicker";
import cl from "./ClickerAndBuff.module.css";

const ClickerAndBuff = ({energy, setBoost}) => {
    return (
        <div className={cl.clickerAndBuff__container}>
            <Clicker/>
            <div className={cl.exchange__container__content}>
                <div className={cl.exchange__container__energyAndBoost}>
                    <div className={cl.exchange__container__energyAndBoost__item}>
                        <div className={cl.exchange__container__energyAndBoost__container__icon}>
                            <img src={require("../../images/lightning.gif")} alt=""/>
                        </div>
                        <div className={cl.exchange__container__energyAndBoost__container__text}>
                            {energy}/1600
                        </div>
                    </div>
                    <button onClick={() => setBoost(true)} className={cl.exchange__container__energyAndBoost__item}>
                        <div className={cl.exchange__container__energyAndBoost__container__icon}>
                            <img src={require("../../images/rocket.gif")} alt=""/>
                        </div>
                        <div className={cl.exchange__container__energyAndBoost__container__text}>
                            Boost
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClickerAndBuff;