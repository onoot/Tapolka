import React from 'react';
import cl from './DailyList.module.css'
import DailyItem from "../DailyItem/DailyItem";
import { useTranslation } from "../../../hooks/useTranslation";

const DailyList = () => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.dailylist}>
            <DailyItem 
                srcIcon={"calendar.webp"} 
                title={t('DailyList.daily_combo')} 
                time={"15:35"} 
                isLock={false} 
                navbarPosition={"farm"}
            />
            <DailyItem 
                srcIcon={"locker.webp"} 
                title={t('DailyList.daily_spin')} 
                time={t('DailyList.soon')} 
                isLock={true} 
                navbarPosition={"farm"}
            />
            <DailyItem 
                srcIcon={"box.webp"} 
                title={t('DailyList.daily_ton')} 
                time={"03:35"} 
                isLock={false} 
                navbarPosition={"drop"}
            />
        </div>
    );
};

export default DailyList;