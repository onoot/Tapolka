import React from 'react';
import cl from './DailyList.module.css'
import DailyItem from "../DailyItem/DailyItem";

const DailyList = () => {
    return (
        <div className={cl.dailylist}>
            <DailyItem srcIcon={"calendar.webp"} title={"Daily combo"} time={"15:35"} isLock={false}/>
            <DailyItem srcIcon={"locker.webp"} title={"Daily Spin"} time={"soon"} isLock={true}/>
            <DailyItem srcIcon={"box.webp"} title={"Daily Transaction"} time={"03:35"} isLock={false}/>
        </div>
    );
};

export default DailyList;