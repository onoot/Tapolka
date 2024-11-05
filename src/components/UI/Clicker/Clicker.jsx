import React, { useState, useEffect, useRef } from 'react';
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
    const clickTimeout = useRef(null);

    // Загружаем изображение для кнопки кликера
    useEffect(() => {
        const img = new Image();
        img.src = clickerImage;
    }, [clickerImage]);

    // Функция для обработки клика
    const handleClick = () => {
        if (player.energy <= 0) return;

        setIsShaking(true);
        setClickCount((prevCount) => prevCount + 1);

        // Локально уменьшаем энергию
        updatePlayer({
            energy: Math.max(0, player.energy - 1),
        });

        // Запуск таймера для отправки кликов раз в CLICK_SEND_DELAY
        if (clickTimeout.current) clearTimeout(clickTimeout.current);
        clickTimeout.current = setTimeout(() => {
            sendClickData();
        }, CLICK_SEND_DELAY);

        setTimeout(() => setIsShaking(false), 200);
    };

    // Функция для отправки данных о кликах на сервер
    const sendClickData = async () => {
        if (clickCount > 0) {
            const currentClickCount = clickCount; // Сохраняем текущее количество кликов
            setClickCount(0); // Обнуляем clickCount для накопления новых кликов
    
            // Отправляем только сохраненные клики
            const data = await fetchWithAuth(`https://app.tongaroo.fun/api/add-coins/${player.id}`, {
                method: 'POST',
                body: JSON.stringify({ clicks: currentClickCount }),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (data?.user?.energy !== undefined) {
                // Обновляем только энергию игрока из ответа сервера
                updatePlayer({
                    energy: data.user.energy,
                });
            }
        }
    };

    // Функция для восстановления энергии каждую секунду
    const regenerateEnergy = () => {
        updatePlayer((state) => ({
            ...state,
            energy: Math.min(MAX_ENERGY, state.energy + ENERGY_REGEN_RATE),
        }));
    };

    // Устанавливаем интервал восстановления энергии
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
