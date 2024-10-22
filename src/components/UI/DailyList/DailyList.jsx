import React from 'react';
import cl from './DailyList.module.css'
import DailyItem from "../DailyItem/DailyItem";

const DailyList = () => {
    return (
        <div className={cl.dailylist}>
            <DailyItem srcIcon={"calendar.gif"} title={"Daily reward"} time={"15:35"} isLock={false}/>
            <DailyItem srcIcon={"locker.gif"} title={"Daily cipher"} time={"soon"} isLock={true}/>
            <DailyItem srcIcon={"box.gif"} title={"Daily combo"} time={"03:35"} isLock={false}/>
        </div>
    );
};

export default DailyList;