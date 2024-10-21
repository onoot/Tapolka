import React from 'react';
import EarnTask from "../EarnTask/EarnTask";
import cl from "./EarnList.module.css";


const EarnList = ({listTasks}) => {

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
            Hamster Youtube
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 2).map((task) =>{
                        return <EarnTask key={task.id} task={task}/>
                    })
                }
            </div>
            Daily tasks
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 1).map((task) =>{
                        return <EarnTask key={task.id} task={task}/>
                    })
                }
            </div>
            Task list
            <div className={cl.earnList_container__row}>
                {
                    sortArray(listTasks, 4).map((task) =>{
                        return <EarnTask key={task.id} task={task}/>
                    })
                }
                {
                    sortArray(listTasks, 3).map((task) =>{
                        return <EarnTask key={task.id} task={task}/>
                    })
                }
            </div>
        </div>
    );
};

export default EarnList;