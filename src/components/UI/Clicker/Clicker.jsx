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
    const isEnergyInitialized = useRef(false);

    useEffect(() => {
        const img = new Image();
        img.src = clickerImage;
    }, [clickerImage]);

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
                if (!isEnergyInitialized.current) {
                    updateEnergy(data.user.energy);
                    isEnergyInitialized.current = true;
                }
            }
        }
    };

    useEffect(() => {
        const clickInterval = setInterval(() => {
            sendClickData();
        }, CLICK_SEND_DELAY);

        return () => clearInterval(clickInterval);
    }, [clickCount]);

    // Восстановление энергии с использованием функционального обновления состояния
    useEffect(() => {
        const regenInterval = setInterval(() => {
            updateEnergy((prevEnergy) => {
                const newEnergy = Math.min(prevEnergy + ENERGY_REGEN_RATE, MAX_ENERGY);
                console.log("Regenerating energy...", newEnergy);
                return newEnergy;
            });
        }, 1000);

        return () => clearInterval(regenInterval);
    }, [updateEnergy]);

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
