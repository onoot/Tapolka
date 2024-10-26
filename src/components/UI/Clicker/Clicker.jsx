import React, { useState, useEffect } from 'react';
import cl from './Clicker.module.css';
import { usePlayerStore } from '../../../store/playerStore';

const Clicker = () => {
    const { player, updatePlayer } = usePlayerStore();
    const [isShaking, setIsShaking] = useState(false);

    const handleClick = () => {
        if (player.energy <= 0) return;

        setIsShaking(true);

        // Уменьшение энергии и увеличение баланса немедленно при каждом клике
        updatePlayer({
            energy: Math.max(0, player.energy - 1),
            money: player.money + 1
        });

        // Отключение анимации после короткой задержки
        setTimeout(() => setIsShaking(false), 200);
    };

    // Эффект восстановления энергии каждую секунду
    useEffect(() => {
        const energyRegenInterval = setInterval(() => {
            if (player.energy < 1600) {
                updatePlayer({ energy: Math.min(player.energy + 1, 1600) });
            }
        }, 1000); // Восстанавливаем энергию каждую секунду

        return () => clearInterval(energyRegenInterval);
    }, [player.energy, updatePlayer]);

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
