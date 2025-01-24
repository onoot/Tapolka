import React from 'react';
import Clicker from "../Clicker/Clicker";
import cl from "./ClickerAndBuff.module.css";
import ButtonWallet from '../ButtonWallet/ButtonWallet';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { useTranslation } from "../../../hooks/useTranslation";

const ClickerAndBuff = ({ setBoost, url }) => {
    const player = usePlayerStore((state) => state.player);
    const energy = player.energy;
    const limitEnergy = player?.boost?.energiLimit?.level==1 ? 0 : player?.boost?.energiLimit?.level*100;
    const MAX_ENERGY = 500+limitEnergy;
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.clickerAndBuff__container}>
            <Clicker url={url} />
            <div className={cl.wallet__container}>
                <ButtonWallet ton={false} connect={false}/>
            </div>
            <div className={`${cl.energyAndBoost__container} ${cl.mt_1}`}>
                <div onClick={() => setBoost(true)} className={cl.energy__item}>
                    <div className={cl.icon}>
                        <img src={require("../../images/lightning.webp")} alt="" />
                    </div>
                    <div className={cl.text}>
                        {energy}/{MAX_ENERGY}
                    </div>
                </div>
                <button onClick={() => setBoost(true)} className={cl.boost__item}>
                    <div className={cl.icon}>
                        <img src={require("../../images/rocket.webp")} alt="" />
                    </div>
                    <div className={cl.text}>
                        {t('ClickerAndBuff.boost')}
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ClickerAndBuff;
