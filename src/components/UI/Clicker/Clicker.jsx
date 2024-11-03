import React, { useState, useEffect } from 'react';
import cl from './Clicker.module.css';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { fetchWithAuth } from '../../utils/auth.mjs';

const Clicker = () => {
    const { player, updatePlayer } = usePlayerStore();
    const [isShaking, setIsShaking] = useState(false);

    const checkEnergy = async () => {
        const data = await fetchWithAuth(`https://62.217.181.16/api/check-energy/${player.id}`);
        if (data?.energy !== undefined) {
            updatePlayer({ energy: data.energy });
        }
    };

    const handleClick = async () => {
        if (player.energy <= 0) return;

        setIsShaking(true);

        // Обновление энергии и баланса на клиенте немедленно
        updatePlayer({
            energy: Math.max(0, player.energy - 1),
            money: player.money + 1,
        });

        // Отправляем запрос для увеличения количества монет
        await fetchWithAuth(`https://62.217.181.16/api/add-coins/${player.id}`, {
            method: 'POST',
        });

        setTimeout(() => setIsShaking(false), 200);
    };

    useEffect(() => {
        const energyRegenInterval = setInterval(() => {
            if (player.energy < 1600) {
                checkEnergy();
            }
        }, 1000);

        return () => clearInterval(energyRegenInterval);
    }, [player.energy]);

    return (
        <div className={cl.container__clicker}>
            <div
                className={`${cl.clicker__btn} ${isShaking ? cl.shake : ''}`}
                onClick={handleClick}
            >
                <img src={require('../../images/clickerBtn.png')} alt="click button" className={cl.clicker__img} />
            </div>
        </div>
    );
};

export default Clicker;
