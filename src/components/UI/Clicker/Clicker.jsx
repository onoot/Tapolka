import React, { useState, useEffect, useRef } from 'react';
import cl from './Clicker.module.css';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import {useTelegram} from "../../../components/hooks/useTelegram";

const ENERGY_REGEN_RATE = 1;
const CLICK_SEND_DELAY = 1500;

const Clicker = ({ url }) => {
    const { player, updatePlayer, updateEnergy } = usePlayerStore();
    const [isShaking, setIsShaking] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const clickerImage = require('../../images/clickerBtn.png');
    const clickTimeout = useRef(null);
    const { tg } = useTelegram();

    const limitEnergy = player?.boost?.energiLimit?.level==1 ? 0 : player?.boost?.energiLimit?.level*100;
    const MAX_ENERGY = 500+limitEnergy;


    useEffect(() => {
        const img = new Image();
        img.src = clickerImage;
    }, [clickerImage]);

    // Обработка кликов
    const handleClick = () => {
        if (player.energy <= 0) return;

        if (tg?.HapticFeedback?.impactOccurred) {
            tg.HapticFeedback.impactOccurred('medium');
        } else {

            console.warn('HapticFeedback API недоступен');
        }
        setIsShaking(true);
        const click = (player?.boost?.multiplier?.level >0? player?.boost?.multiplier?.level : 1);
        
        setClickCount((prevCount) => prevCount + click);

        updatePlayer({
            energy: Math.max(0, player.energy - 1),
            money: player.money + click,
        });

        setTimeout(() => setIsShaking(false), 200);
    };

    // Функция для отправки данных о кликах
    const sendClickData = async () => {
        if (clickCount > 0) {
            const currentClickCount = clickCount;
            setClickCount(0);
            const token = localStorage.getItem('token');
            if (!token) {
                console.error(!token);
                return;
            }
            const data = await fetch(`${url}/api/add-coins/${player.id}`, {
                method: 'POST',
                body: JSON.stringify({ clicks: currentClickCount }),
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    
                 },
            });

            // Устанавливаем энергию, возвращенную сервером
            if (data?.user?.energy !== undefined) {
                updateEnergy(data.user.energy); 
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

    // Восстановление энергии
    const regenerateEnergy = () => {
        if (player.energy < MAX_ENERGY) {
            updateEnergy(Math.min(MAX_ENERGY, player.energy + ENERGY_REGEN_RATE));
        }
    };

    // Интервал восстановления энергии
    useEffect(() => {
        const regenInterval = setInterval(() => {
            regenerateEnergy();
        }, 1000);

        return () => clearInterval(regenInterval);
    }, [player.energy]); 

    return (
        <div className={cl.container__clicker}>
            <div
                className={`${cl.clicker__btn} ${isShaking ? cl.scaleDo : ''}`}
                onClick={handleClick}
            >
                <img src={clickerImage} alt="click button" className={cl.clicker__img} />
            </div>
        </div>
    );
};

export default Clicker;
