import React, {useState} from 'react';
import cl from "../styles/friends.module.css"
import EarnList from "../components/UI/EarnList/EarnList";

const Earn = () => {
    const [tasks, setTasks] = useState([
        {id: 1, task: "Watch! Raring $Togo has new love?", reward: 5000,type:2},
        {id: 2, task: "The Power of The community", reward: 25000, type:2},
        {id: 3, task: "Watch! Raring panda has new love?", reward: 25000, type:1},
        {id: 4, task: "The Power of The community", reward: 25000, type:4},
        {id: 5, task: "Watch! Raring panda has new love?", reward: 25000, type:3},
    ])


    return (
        <div className={`${cl.friends__container} ${cl.mt_40}`}>
            <div className={cl.friends__container__title}>
                Earn more coins
            </div>
            <div className={cl.friends__container__description}>
                Complete the task and earn more coins!
            </div>
            <EarnList listTasks={tasks}/>
        </div>
    );
};

export default Earn;