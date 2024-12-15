import React from 'react';
import Clicker from "../Clicker/Clicker";
import cl from "./ClickerAndBuff.module.css";
import ButtonWallet from '../ButtonWallet/ButtonWallet';
import { usePlayerStore } from '../../../store/playerStore.mjs';

const ClickerAndBuff = ({ setBoost, url }) => {
    const player = usePlayerStore((state) => state.player);
    const energy = player.energy;

    return (
        <div className={cl.clickerAndBuff__container}>
            <Clicker url={url} />
            <div className={cl.wallet__container}>
                <ButtonWallet ton={false} />
            </div>
            <div className={`${cl.energyAndBoost__container} ${cl.mt_1}`}>
                <div className={cl.energy__item}>
                    <div className={cl.icon}>
                        <img src={require("../../images/lightning.webp")} alt="" />
                    </div>
                    <div className={cl.text}>
                        {energy}/500
                    </div>
                </div>
                <button onClick={() => setBoost(true)} className={cl.boost__item}>
                    <div className={cl.icon}>
                        <img src={require("../../images/rocket.webp")} alt="" />
                    </div>
                    <div className={cl.text}>
                        Boost
                    </div>
                </button>
            </div>
        </div>
    );
    
};

export default ClickerAndBuff;
