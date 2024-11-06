import React, { useState, useEffect, useRef } from 'react';
import cl from './Clicker.module.css';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { fetchWithAuth } from '../../utils/auth.mjs';

const MAX_ENERGY = 1600;
const ENERGY_REGEN_RATE = 1;
const CLICK_SEND_DELAY = 2000;

const Clicker = () => {
    const { player, updatePlayer, updateEnergy } = usePlayerStore();
    const [isShaking, setIsShaking] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const clickerImage = require('../../images/clickerBtn.png');
    const clickTimeout = useRef(null);
    const isEnergyInitialized = useRef(false); // Флаг для отслеживания инициализации энергии

    useEffect(() => {
        const img = new Image();
        img.src = clickerImage;
    }, [clickerImage]);

    // Обработка кликов
    const handleClick = () => {
        if (player.energy <= 0) return;

        setIsShaking(true);
        setClickCount((prevCount) => prevCount + 1);

        updatePlayer({
            energy: Math.max(0, player.energy - 1),
            money: player.money + 1,
        });

        setTimeout(() => setIsShaking(false), 200);
    };

    // Функция для отправки данных о кликах
    const sendClickData = async () => {
        if (clickCount > 0) {
            const currentClickCount = clickCount;
            setClickCount(0);

            const data = await fetchWithAuth(`https://app.tongaroo.fun/api/add-coins/${player.id}`, {
                method: 'POST',
                body: JSON.stringify({ clicks: currentClickCount }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (data?.user?.energy !== undefined) {
                // Обновляем энергию только при инициализации или после ответа от сервера
                if (!isEnergyInitialized.current) {
                    updateEnergy(data.user.energy);
                    isEnergyInitialized.current = true;
                }
            }
        }
    };

    // Таймер для отправки кликов
    useEffect(() => {
        const clickInterval = setInterval(() => {
            sendClickData();
        }, CLICK_SEND_DELAY);

        return () => clearInterval(clickInterval);
    }, [clickCount]);

    // Восстановление энергии на 1 единицу, если она ниже максимального значения
    const regenerateEnergy = () => {
        if (player.energy < MAX_ENERGY) {
            updateEnergy(player.energy + ENERGY_REGEN_RATE);
            console.log("Regenerating energy...", player.energy);
        }
    };

    // Интервал восстановления энергии
    useEffect(() => {
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
