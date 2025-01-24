import React from 'react';
import cl from './DailyItem.module.css';
import { Link } from "react-router-dom";

const DailyItem = ({ srcIcon, title, time, isLock, navbarPosition }) => {
    let nameClass;
    if (isLock) {
        nameClass = `${cl.dailyList__container} ${cl.true}`;
    } else {
        nameClass = cl.dailyList__container;
    }

    return (
        <Link to={`/${navbarPosition}`} className={`${nameClass} ${cl.noLinkStyles}`}>
            <div className={cl.dailyList__container__icon}>
                <img src={require(`../../images/${srcIcon}`)} alt="" />
            </div>
            <div className={cl.dailyList__container__title}>
                {title}
            </div>
        </Link>
    );
};

export default DailyItem;