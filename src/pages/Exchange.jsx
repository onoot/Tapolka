import React from 'react';
import cl from '../styles/exchange.module.css'
import DailyList from "../components/UI/DailyList/DailyList";
import Money from "../components/UI/Money/Money";
import clSecond from "../styles/mainPanel.module.css";
import ClickerAndBuff from "../components/UI/ClickerAndBuff/ClickerAndBuff";

const Exchange = ({player, setPlayer, money, energy, setBoost, url}) => {

    return (
        <div className={clSecond.mainPanel}>
            <div className={cl.exchange__container}>
                <div className={cl.exchange__container__money}>
                    <Money money={money}/>
                </div>
                <ClickerAndBuff player={player} setPlayer={setPlayer} energy={energy} setBoost={setBoost} url={url}/>
                <DailyList/>
            </div>
        </div>
    );
};

export default Exchange;