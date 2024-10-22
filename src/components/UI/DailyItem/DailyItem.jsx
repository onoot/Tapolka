import React from 'react';
import cl from './DailyItem.module.css'

const DailyItem = ({srcIcon, title, time, isLock}) => {
    let nameClass;
    if (isLock){
        nameClass = `${cl.dailyList__container} ${cl.true}`
    } else{
        nameClass = cl.dailyList__container
    }

    return (
        <div className={nameClass}>
            <div className={cl.dailyList__container__icon}>
                <img src={require(`../../images/${srcIcon}`)} alt=""/>
            </div>
            <div className={cl.dailyList__container__title}>
                {title}
            </div>
            <div className={cl.dailyList__container__time}>
                {time}
            </div>
        </div>
    );
};

export default DailyItem;