import React, { useState, useEffect } from 'react';
import cl from "../Settings/Settings.module.css";
import ButtonClose from "../ButtonSettingBack/ButtonClose";
import clD from "./Progress.module.css";
import ProgressItem from "../ProgressItem/ProgressItem";
import { convertMoneyToReduction } from "../../hooks/converMoney";
import { convertData } from "../../hooks/convertUserData.mjs";

const Progress = ({ visible, setVisible, player, url, pisda }) => {
    const [users, setUsers] = useState([]);
    const [rank, setRank] = useState(null);
    const money = convertMoneyToReduction(player?.money);
    const converter = new convertData();

    async function getData() {
        try {
            if (pisda === false) return;
            const token = localStorage.getItem('token');
            if (!token) {
                console.error(!token);
                return;
            }
            const response = await fetch(`${url}/api/board/${player?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data) {
                setUsers(data.users); // Устанавливаем только массив пользователей
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, [pisda]);

    useEffect(() => {
        if (player && player.rank !== undefined) {
            const convertedRank = converter.convertRank(player.rank);
            setRank(convertedRank);
        }
    }, [player]);

    const rootClasses = [clD.settings__container];
    if (visible === true) {
        rootClasses.push(clD.active);
    }

    // Проверяем, есть ли user.id среди users
    const isUserInUsers = users.some((u) => u.id === player?.id);

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
                    {users?.map((prop) => {
                        return (
                            <div className={`${clD.progress_for_pizda} ${prop.id === player?.id ? clD.progress_for_user : ''}`}>
                                <ProgressItem key={prop.id} prop={prop} />
                            </div>
                        )
                    })}
                </div>
                {!isUserInUsers && (
                    <div className={clD.progress__user}>
                        <ProgressItem key={player.id} prop={player} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Progress;