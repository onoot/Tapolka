import React, { useState, useEffect } from 'react';
import cl from "../styles/mine.module.css";
import clSecond from "../styles/mainPanel.module.css";
import Button from "../components/UI/Button/Button";
import MineCard from "../components/UI/MineCard/MineCard";
import Money from "../components/UI/Money/Money";
import MineMarketList from "../components/UI/MineMarketList/MineMarketList";
import { countdownToMidnight } from '../../src/components/utils/timer.mjs';
import {DayStore} from '../store/dayStore.mjs'; 

const Mine = ({ timer, money, energy, setMinePanel, setBoost, url }) => {
    const [reward, setReward] = useState(null);
    const [remainingTime, setRemainingTime] = useState('');
    const [dailyImages, setDailyImages] = useState([]);

    // Инициализация хранилища DayStore
    const dayStore = new DayStore();

    // Получение изображений из хранилища
    useEffect(() => {
        setDailyImages(dayStore.items.map((item) => item.image));
    }, []);

    // Запрос на получение награды
    async function getReward() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Токен отсутствует');
                return;
            }
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
            const data = await response.json();
            setReward(data);
        } catch (e) {
            console.error(e);
        }
    }

    // Обновление времени до полуночи
    useEffect(() => {
        getReward();
    }, []);

    useEffect(() => {
        const intervalId = countdownToMidnight(reward?.Data || null, setRemainingTime);
        return () => clearInterval(intervalId);
    }, [reward]);

    return (
        <div className={clSecond.mainPanel}>
            <div className={cl.mine__container}>
                <div className={cl.mine__container__timer}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="..." fill="#8E8E8E" />
                    </svg>
                    {remainingTime}
                </div>
                <div className={cl.mine__container__dailyCombo}>
                    <div className={cl.mine__container__dailyCombo__items}>
                        <div>Daily combo</div>
                        <Button text={reward?.reward || "Coming Soon"} isImg={true} isFullScreen={false} />
                    </div>
                    <div className={cl.mine__container__dailyCombo__items}>
                        {dailyImages.map((image, index) => (
                            <MineCard key={index} setMinePanel={setMinePanel} backgroundImage={image} />
                        ))}
                    </div>
                </div>
                <Money money={money} />
                <MineMarketList setMinePanel={setMinePanel} url={url} />
            </div>
        </div>
    );
};

export default Mine;
