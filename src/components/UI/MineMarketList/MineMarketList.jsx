import React, { useEffect, useState } from 'react';
import cl from './MineMarketList.module.css';
import MineMarketType from '../MineMarketType/MineMarketType';
import MineMarketItem from '../MineMarketItem/MineMarketItem';
import MineMarketItemSpecial from '../MineMarketItemSpecial/MineMarketItemSpecial';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { useTranslation } from '../../../hooks/useTranslation';

const MineMarketList = ({setMinePanel, url }) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    
    const [mineTypes, setMineTypes] = useState([
        { id: 1, name: t('MineMarket.types.Combo'), isActive: true },
        { id: 2, name: t('MineMarket.types.Market'), isActive: false },
        { id: 3, name: t('MineMarket.types.Spin'), isActive: false },
        { id: 4, name: t('MineMarket.types.Lootbox'), isActive: false },
    ]);
    
    const {player} = usePlayerStore((state) => state);
    const [mineItems, setMineItems] = useState([]);
    const [count, setCount] = useState(0);

    const getItems = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found');
                return;
            }
            const req = await fetch(`${url}/api/getMineItems/${player?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!req || req.status !== 200) return false;
            const data = await req.json();
            setMineItems(data?.updatedTasks);
            setCount(data?.unlock || 0);
        } catch (e) {
            console.log(t('MineMarket.errors.getItems'), e);
        }
    };
    
    useEffect(() => {
        getItems();
    }, [mineTypes, player?.money]);

    return (
        <div className={cl.mineMarketContainer}>
            <div className={cl.mineMarketContainer__types}>
                {mineTypes.map((type) => (
                    <MineMarketType 
                        key={type.id} 
                        mas={setMineTypes} 
                        type={type}
                    />
                ))}
            </div>
            <div className={cl.mineMarketContainer__ItemsContainer}>
                {mineItems?.map((item, index) => {
                    const activeTypeName = mineTypes.find(type => type.isActive)?.name;
                    const translatedTypeName = t(`MineMarket.types.${item.type}`);
                    const isUnlocked = index < 6 || index < count + 6;

                    if (translatedTypeName === activeTypeName) {
                        return item.type === "Specials" ? (
                            <MineMarketItemSpecial
                                key={item.id || index}
                                item={{ ...item, isLock: !isUnlocked }}
                            />
                        ) : (
                            <MineMarketItem
                                setMinePanel={setMinePanel}
                                key={item.id || index}
                                item={{ ...item, isLock: !isUnlocked }}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default MineMarketList;
