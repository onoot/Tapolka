import React, {useState} from 'react';
import cl from "./MineMarketList.module.css"
import MineMarketType from "../MineMarketType/MineMarketType";
import MineMarketItem from "../MineMarketItem/MineMarketItem";
import MineMarketItemSpecial from "../MineMarketItemSpecial/MineMarketItemSpecial";

const MineMarketList = () => {
    const [mineTypes, setMineTypes] = useState([
        {id: 1, name: "PR&Team", isActive: true},
        {id: 2, name: "Markets", isActive: false},
        {id: 3, name: "Legal", isActive: false},
        {id: 4, name: "Specials", isActive: false},
    ])
    const [mineItems, setMineItems] = useState([
        {id:1, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:2, path: "tiger", title: "Marketing", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:3, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:4, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "PR&Team"},
        {id:5, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:6, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:7, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:8, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "PR&Team"},
        {id:9, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "Markets"},
        {id:10, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "Markets"},
        {id:11, path: "tiger", title: "Marketing", profit: 1000, price: 1000, isLock: true, type: "Markets"},
        {id:11, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "Markets"},
        {id:9, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "Legal"},
        {id:10, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: false, type: "Legal"},
        {id:11, path: "tiger", title: "Marketing", profit: 1000, price: 1000, isLock: true, type: "Legal"},
        {id:12, path: "tiger", title: "CEO", profit: 1000, price: 1000, isLock: true, type: "Legal"},
        {id:13, path: "tiger", title: "Web3 academy launch", profit: 1000, price: 1000, isLock: true, type: "Specials"},
        {id:14, path: "tiger", title: "Web3 Game Con", profit: 1000, price: 1000, isLock: true, type: "Specials"},
    ])



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