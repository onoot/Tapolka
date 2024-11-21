import React, { useEffect, useState } from 'react';
import cl from './MineMarketList.module.css';
import MineMarketType from '../MineMarketType/MineMarketType';
import MineMarketItem from '../MineMarketItem/MineMarketItem';
import MineMarketItemSpecial from '../MineMarketItemSpecial/MineMarketItemSpecial';
import { useTelegram } from '../../hooks/useTelegram';

const MineMarketList = ({ url }) => {
    const [mineTypes, setMineTypes] = useState([
        { id: 1, name: 'PR&Team', isActive: true },
        { id: 2, name: 'Markets', isActive: false },
        { id: 3, name: 'Legal', isActive: false },
        { id: 4, name: 'Specials', isActive: false },
    ]);

    const { initData } = useTelegram();
    const [mineItems, setMineItems] = useState([]);

    const getItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const req = await fetch(`${url}/api/getMineItems/${initData.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!req || req.status !== 200) return false;
            const data = await req.json();
            setMineItems(data);
        } catch (e) {}
    };

    const handleTypeClick = (id) => {
        // Разрешить клики только для `PR&Team` (id === 1)
        if (id !== 1) return;
        setMineTypes((prev) =>
            prev.map((type) => ({
                ...type,
                isActive: type.id === id, // Только первая активна
            }))
        );
    };

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className={cl.mineMarketContainer}>
            <div className={cl.mineMarketContainer__types}>
                {mineTypes.map((type) => (
                    <MineMarketType
                        key={type.id}
                        type={type}
                        onClick={() => handleTypeClick(type.id)}
                    />
                ))}
            </div>
            <div className={cl.mineMarketContainer__ItemsContainer}>
                {mineItems.map((item, index) => {
                    if (
                        item.type === mineTypes
                            .filter((type) => type.isActive)
                            .map((type) => type.name)[0]
                    ) {
                        return item.type === 'Specials' ? (
                            <MineMarketItemSpecial key={index} item={item} />
                        ) : (
                            <MineMarketItem key={index} item={item} />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default MineMarketList;
