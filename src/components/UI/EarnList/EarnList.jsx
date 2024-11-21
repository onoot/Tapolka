import React from 'react';
import EarnTask from "../EarnTask/EarnTask";
import cl from "./EarnList.module.css";


const EarnList = ({listTasks, url}) => {

    function sortArray(array, sort){
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
            Daily tasks
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 1).map((task) =>{
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
            Task list
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 4).map((task) =>{
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
                {
                    sortArray(listTasks, 3).map((task) =>{
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
            Tongaroo Youtube
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 2).map((task) =>{
                        return <EarnTask key={task.id} task={task} url={url}/>
                    })
                }
            </div>
        </div>
    );
};

export default EarnList;