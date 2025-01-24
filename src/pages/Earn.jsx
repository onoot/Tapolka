import React, {useState} from 'react';
import cl from "../styles/friends.module.css"
import EarnList from "../components/UI/EarnList/EarnList";
import { useTranslation } from "../hooks/useTranslation";

const Earn = ({url}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    const [tasks, setTasks] = useState([
        {id: 3, task: t('Earn.tasks.subscribe_blum'), reward: 1000, type: 2, number: 6},
        {id: 2, task: t('Earn.tasks.subscribe_paws'), reward: 1000, type: 2, number: 5},
        {id: 1, task: t('Earn.tasks.daily_combo'), reward: 1000, type: 1, number: 1},
        {id: 4, task: t('Earn.tasks.subscribe_community'), reward: 1000, type: 4, number: 4},
        {id: 5, task: t('Earn.tasks.boost_community'), reward: 1000, type: 3, number: 4},
    ]);

    return (
        <div className={`${cl.friends__container} ${cl.mt_20}`}>
            <div className={cl.friends__container__title}>
                {t('Earn.title')}
            </div>
            <div className={cl.friends__container__description}>
                {t('Earn.description')}
            </div>
            <EarnList listTasks={tasks} url={url}/>
        </div>
    );
};

export default Earn;