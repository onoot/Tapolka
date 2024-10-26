import React from 'react';
import Clicker from "../Clicker/Clicker";
import cl from "./ClickerAndBuff.module.css";
import ButtonWallet from '../ButtonWallet/ButtonWallet';
import { usePlayerStore } from '../../../store/playerStore';

const ClickerAndBuff = ({ setBoost }) => {
    const player = usePlayerStore((state) => state.player);
    const energy = player.energy;

    return (
        <div className={cl.clickerAndBuff__container}>
            <Clicker />
            <ButtonWallet />
            <div className={cl.exchange__container__content}>
                <div className={cl.exchange__container__energyAndBoost}>
                    <div className={cl.exchange__container__energyAndBoost__item}>
                        <div className={cl.exchange__container__energyAndBoost__container__icon}>
                            <img src={require("../../images/lightning.gif")} alt="" />
                        </div>
                        <div className={cl.exchange__container__energyAndBoost__container__text}>
                            {energy}/1600
                        </div>
                    </div>
                    <button onClick={() => setBoost(true)} className={cl.exchange__container__energyAndBoost__item}>
                        <div className={cl.exchange__container__energyAndBoost__container__icon}>
                            <img src={require("../../images/rocket.gif")} alt="" />
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
