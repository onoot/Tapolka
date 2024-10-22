import React from 'react';
import cl from '../styles/exchange.module.css'
import DailyList from "../components/UI/DailyList/DailyList";
import Money from "../components/UI/Money/Money";
import clSecond from "../styles/mainPanel.module.css";
import ClickerAndBuff from "../components/UI/ClickerAndBuff/ClickerAndBuff";
import Settings from "../components/UI/Settings/Settings";

const Exchange = ({money, energy, setBoost}) => {

    return (
        <div className={clSecond.mainPanel}>
            <div className={cl.exchange__container}>
                <div className={cl.exchange__container__money}>
                    <Money money={money}/>
                </div>
                <ClickerAndBuff energy={energy} setBoost={setBoost}/>
                <DailyList/>
            </div>
        </div>
    );
};

export default Exchange;