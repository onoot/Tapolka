import React, { useEffect, useState } from 'react';
import cl from './MineMarketList.module.css';
import MineMarketType from '../MineMarketType/MineMarketType';
import MineMarketItem from '../MineMarketItem/MineMarketItem';
import MineMarketItemSpecial from '../MineMarketItemSpecial/MineMarketItemSpecial';
import { useTelegram } from '../../hooks/useTelegram';

const MineMarketList = ({ url }) => {
    const [mineTypes, setMineTypes] = useState([
        { id: 1, name: 'Combo', isActive: true },
        { id: 2, name: 'Market', isActive: false },
        { id: 3, name: 'Spin', isActive: false },
        { id: 4, name: 'Specials', isActive: false },
    ]);
    const [mineItems, setMineItems] = useState([
       
    ])
    const { initData } = useTelegram();
    const getItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const req = await fetch(`${url}/api/getMineItems/${initData?.user?.id || 1148770814}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!req || req.status !== 200) return false;
            const data = await req.json();
            setMineItems(data);
        } catch (e) {
            console.log("Ошибка получения карт", e);
        }
    };
    
    useEffect(() => {
        getItems();
    }, [mineTypes]);

    return (
        <div className={cl.mineMarketContainer}>
            <div className={cl.mineMarketContainer__types}>
                {mineTypes.map((type) => {
                    return <MineMarketType key={type.id} mas={setMineTypes} type={type}/>
                })}
            </div>
            <div className={cl.mineMarketContainer__ItemsContainer}>
                {mineItems.map((item, index) => {
                    if(item.type == (mineTypes.filter(item => item.isActive).map(item => item.name))) {
                        if(item.type === "Specials") {
                            return <MineMarketItemSpecial key={index} item={item}/>
                        } else{
                            return <MineMarketItem key={index} item={item}/>

                        }
                    }
                })
                }
            </div>
        </div>
    );
};

export default MineMarketList;
