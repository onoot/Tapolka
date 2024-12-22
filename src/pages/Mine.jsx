import React, { useState, useEffect } from 'react';
import cl from '../styles/mine.module.css';
import clSecond from '../styles/mainPanel.module.css';
import Button from '../components/UI/Button/Button';
import MineCard from '../components/UI/MineCard/MineCard';
import Money from '../components/UI/Money/Money';
import MineMarketList from '../components/UI/MineMarketList/MineMarketList';
import { countdownToMidnight } from '../../src/components/utils/timer.mjs';
import { useDayStore } from '../store/dayStore.mjs';
import { usePlayerStore } from '../store/playerStore.mjs';
import kangaroo from '../components/images/kangaroo.png';
import { convertMoneyToRCommasIsFull } from '../components/hooks/converMoney';

const Mine = ({ timer, money, energy, setMinePanel, setBoost, url }) => {
  const [reward, setReward] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [cards, setCards] = useState([]); // Локальное состояние для карточек
  const { player } = usePlayerStore();
  const { items, updateImage } = useDayStore();

  useEffect(() => {
    setReward(player?.reward);
    // Получаем уникальные идентификаторы карт из combo_daily_tasks
    if (player?.daily) {
      console.log(player)
      try {
        const uniqueIds = [...new Set(player.daily.map((task) => task.id))];

        // Обновляем изображения в Zustand-хранилище
        uniqueIds.forEach((id, index) => {
          if (index < items.length) {
            updateImage(index + 1, kangaroo);
          }
        });
      } catch (error) {
        console.error('Error parsing combo_daily_tasks:', error);
      }
    }
  }, [player?.money,]);

  useEffect(() => {
    // Обновляем карточки при изменении money или items
    const updatedCards = items.map((item) => ({
      ...item,
      image: item.image || kangaroo, // Установка изображения, если отсутствует
    }));
    setCards(updatedCards);
  }, [player?.money, items]);

  useEffect(() => {
    const intervalId = countdownToMidnight(reward?.date || null, setRemainingTime);
    return () => clearInterval(intervalId);
  }, [reward]);

  const money_rew = reward?.reward > 0 ? convertMoneyToRCommasIsFull(reward?.reward) : 0;

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
            <Button text={money_rew || 'Coming Soon'} isImg={true} isFullScreen={false} />
          </div>
          <div className={cl.mine__container__dailyCombo__items}>
            {cards.map((card) => (
              <MineCard key={card.id} setMinePanel={setMinePanel} backgroundImage={card.image} />
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
