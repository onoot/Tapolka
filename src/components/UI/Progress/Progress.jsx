import React, { useState, useEffect } from 'react';
import cl from "../Settings/Settings.module.css";
import ButtonClose from "../ButtonSettingBack/ButtonClose";
import clD from "./Progress.module.css";
import ProgressItem from "../ProgressItem/ProgressItem";
import { convertMoneyToReduction } from "../../hooks/converMoney";
import {convertData} from "../../hooks/convertUserData.mjs";

const Progress = ({ visible, setVisible, player }) => {
    const [users, setUsers] = useState([])
    const [rank, setRank] = useState(null);
    const money = convertMoneyToReduction(player?.money);
    const converter = new convertData();
    
    
    async function getData() {
        try {
            const response = await fetch('https://kangaroo-quest-default-rtdb.firebaseio.com/users.json');
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        if (player && player.rank !== undefined) {
            const convertedRank = converter.convertRank(player.rank);
            setRank(convertedRank);
        }
    }, [player]);

    const rootClasses = [clD.settings__container]
    if (visible === true) {
        rootClasses.push(clD.active)
    }
    return (
        <div>
            <div className={rootClasses.join(" ")}>
                <div className={cl.settings__container__titlePanel}>
                    <ButtonClose setVisible={setVisible} />
                    <div className={cl.settings__container__title}>
                        Progress
                    </div>
                </div>
                <div className={clD.progress__container}>
                    <div className={clD.progress__container__img}>
                        <img src={require("../../images/progressKangaroo.png")} alt="" />
                    </div>
                    <div className={clD.progress__container__rank}>
                        {rank?.rank}
                    </div>
                    <div className={clD.progress__container__count}>
                        {money} / 10M
                    </div>
                    <div style={{
                        '--progress-width': `${player?.money/10_000_000*100 || 0}%`,
                    }}
                        className={clD.progress__progressBar}>
                    </div>
                </div>
                <div className={cl.settings__container__settingBlock}>
                    {users.map((prop) => {
                        return (
                            <ProgressItem key={prop.id} prop={prop} />
                        )
                    })}
                </div>
                <div className={clD.progress__user}>
                    <ProgressItem key={player.id} prop={player} />
                </div>
            </div>
        </div>
    );
};

export default Progress;