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
    const [mineItems, setMineItems] = useState([
        {id:1, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:2, path: "tiger", title: "Marketing", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:3, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:4, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:5, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:6, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:7, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:8, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
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
