import React, { useState, useEffect } from 'react';
import cl from './Clicker.module.css';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { fetchWithAuth } from '../../utils/auth.mjs';

const MAX_ENERGY = 1600;
const ENERGY_REGEN_RATE = 1;
const CLICK_SEND_DELAY = 2000;

const Clicker = () => {
    const { player, updatePlayer } = usePlayerStore();
    const [isShaking, setIsShaking] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const clickerImage = require('../../images/clickerBtn.png');
    let clickTimeout = null;

    useEffect(() => {
        const img = new Image();
        img.src = clickerImage;
    }, [clickerImage]);

    const handleClick = () => {
        if (player.energy <= 0) return;

        setIsShaking(true);
        setClickCount((prevCount) => prevCount + 1);

        // Локально обновляем энергию и деньги
        updatePlayer({
            energy: Math.max(0, player.energy - 1),
            money: player.money + 1,
        });
        
        if (clickTimeout) clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            sendClickData();
        }, CLICK_SEND_DELAY);

        setTimeout(() => setIsShaking(false), 200);
    };

    const sendClickData = async () => {
        if (clickCount > 0) {
            const data = await fetchWithAuth(`https://app.tongaroo.fun/api/add-coins/${player.id}`, {
                method: 'POST',
                body: JSON.stringify({ clicks: clickCount }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (data?.user?.energy !== undefined) {
                // Обновляем энергию и деньги из ответа сервера
                updatePlayer({
                    energy: data.user.energy,
                    money: data.user.money,
                });
            }
            setClickCount(0);
        }
    };

    // Функция для восстановления энергии каждую секунду
    const regenerateEnergy = () => {
        updatePlayer((state) => ({
            ...state,
            energy: Math.min(MAX_ENERGY, state.energy + ENERGY_REGEN_RATE),
        }));
    };

    useEffect(() => {
        // Запуск функции восстановления энергии каждую секунду
        const regenInterval = setInterval(() => {
            regenerateEnergy();
        }, 1000);

        return () => clearInterval(regenInterval);
    }, []);

    return (
        <div className={cl.container__clicker}>
            <div
                className={`${cl.clicker__btn} ${isShaking ? cl.shake : ''}`}
                onClick={handleClick}
            >
                <img src={clickerImage} alt="click button" className={cl.clicker__img} />
            </div>
        </div>
    );
};

export default Clicker;
