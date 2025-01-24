import React from 'react';
import EarnTask from "../EarnTask/EarnTask";
import cl from "./EarnList.module.css";
import { useTranslation } from "../../../hooks/useTranslation";

const EarnList = ({listTasks, url}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    function sortArray(array, sort) {
        let arrayResult = [];
        array.map((task) => {
            if (task.type === sort) {
                arrayResult.push(task);
            }
        });
        return arrayResult;
    }

    return (
        <div className={cl.earnList_container}>
            {/* Partner tasks */}
            {t('EarnList.sections.partner')}
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 2).map((task) => {
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
            
            {/* Community tasks */}
            {t('EarnList.sections.community')}
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 4).map((task) => {
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
                {
                    sortArray(listTasks, 3).map((task) => {
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
            
            {/* Daily tasks */}
            {t('EarnList.sections.daily')}
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 1).map((task) => {
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
        </div>
    );
};

export default EarnList;
