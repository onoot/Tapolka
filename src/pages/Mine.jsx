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
import { toast } from 'react-toastify';
import { useTranslation } from "../hooks/useTranslation";

const Mine = ({ timer, money, energy, setMinePanel, setBoost, url }) => {
  const [reward, setReward] = useState(null);
  const [remainingTime, setRemainingTime] = useState('');
  const [cards, setCards] = useState([]);
  const [parsedDaily, setParsedDaily] = useState(null);
  const { player, updateMoney } = usePlayerStore();
  const { items, updateImage } = useDayStore();
  const [isWin, setIsWin] = useState(false);
  const language = localStorage.getItem('language') || 'en';
  const { t } = useTranslation(language);

  useEffect(() => {
    setReward(player?.reward);
  }, [player?.reward]);

  useEffect(() => {
    try {
      let parsed;
      try{
        parsed = JSON.parse(player?.daily);
      }catch (error) {
        parsed = player?.daily;
      }
      setParsedDaily(parsed);
    } catch (error) {
      console.error('Error parsing player.daily JSON:', error);
      const parsed = player?.daily;
      setParsedDaily(parsed);
    }
  }, [player]);

  useEffect(() => {
    const delay = 500;
    if (!player || !player.id) {
      console.error('Player object is not defined or missing ID');
      return;
    }
    
    const timeoutId = setTimeout(() => {
      if (!Array.isArray(parsedDaily)) {
        console.error('parsedDaily is not an array:', parsedDaily);
        try {
          const parsed = JSON.parse(parsedDaily);
          setParsedDaily(parsed); // Обновляем состояние вместо прямого изменения переменной
        } catch (error) {
          console.error('Error parsing parsedDaily:', error);
          setParsedDaily([]); // Устанавливаем пустой массив в случае ошибки
          return;
        }
      }

      try {
        const uniqueIds = [...new Set(parsedDaily.map((task) => task.id))];
        uniqueIds.forEach((id, index) => {
          if (index < items.length) {
            updateImage(index + 1, kangaroo);
          }
        });
      } catch (error) {
        console.error('Error mapping parsedDaily', error);
      }

      const updatedCards = items.map((item) => (
        {
          ...item,
          image: item.image || kangaroo,
          //если image является kangaroo, то guessed=true 
          guessed: item.image == kangaroo ? true : false,
        }));

      setCards(updatedCards);
      const guessedCount = updatedCards.filter((card) => card.guessed).length;
      if (guessedCount >= 3 && !isWin) {
        setIsWin(true);
        checkDailyCompletion();
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [parsedDaily, items]);

  useEffect(() => {
    const intervalId = countdownToMidnight(reward?.date || null, setRemainingTime);
    return () => clearInterval(intervalId);
  }, [reward]);

  useEffect(() => {
    let i = 0;
    cards.map((card) => {
      if (card.guessed)
        i++;
      else {
        i = 0;
        return
      }
    })
    // if(i == 3)
    // checkDailyCompletion();
  }, [cards, player]);

  const checkDailyCompletion = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error(!token);
        return;
      }
      let parsed;
      try{
        parsed = JSON.parse(player?.daily);
      }catch (error) {
        parsed = player?.daily;
      }
      const response = await fetch(`${url}/api/check-daily`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: player?.id, daily: parsed }),
      });
      if (response.status===200) {
        updateMoney(player.money + reward?.reward); 
        toast.success(t('Mine.toasts.success'), { theme: 'dark' });
        setCards([]);
        setIsWin(true);
        localStorage.setItem('combo', {combo: true, date: new Date().toISOString()});
        return;
      } else if (response.status === 204) {
        setIsWin(true);
        return;
      } else if (response.status === 400) {
        toast.warning(t('Mine.toasts.warnings.notEnoughCards'), { theme: 'dark' });
      } else if (response.status === 401) {
        toast.error(t('Mine.toasts.errors.unauthorized'), { theme: 'dark' });
      } else if (response.status === 404) {
        toast.error(t('Mine.toasts.errors.userNotFound'), { theme: 'dark' });
      } else {
        toast.warning(t('Mine.toasts.warnings.unexpectedResponse'), { theme: 'dark' });
      }
    } catch (error) {
      toast.error(t('Mine.toasts.errors.checkingCompletion'), { theme: 'dark' });
      console.error('Error checking daily completion:', error);
    }
  };

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
            <div>{t('Mine.dailyCombo')}</div>
            <Button text={money_rew || t('Mine.comingSoon')} isImg={true} isFullScreen={false} />
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