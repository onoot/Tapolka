import React from 'react';
import cl from './DailyList.module.css'
import DailyItem from "../DailyItem/DailyItem";

const DailyList = () => {
    return (
        <div className={cl.dailylist}>
            <DailyItem srcIcon={"calendar.webp"} title={"Daily combo"} time={"15:35"} isLock={false} navbarPosition={"mine"}/>
            <DailyItem srcIcon={"locker.webp"} title={"Daily Spin"} time={"soon"} isLock={true} navbarPosition={"mine"}/>
            <DailyItem srcIcon={"box.webp"} title={"Daily Transaction"} time={"03:35"} isLock={false} navbarPosition={"airdrop"}/>
        </div>
    );
};

export default DailyList;