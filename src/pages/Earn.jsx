import React, {useState} from 'react';
import cl from "../styles/friends.module.css"
import EarnList from "../components/UI/EarnList/EarnList";

const Earn = ({url}) => {
    const [tasks, setTasks] = useState([
        {id: 1, task: "Subscribe to Blum", reward: 5000,type:2, number:1},
        {id: 2, task: "Subscribe to Paws", reward: 5000, type:2, number:2},
        {id: 3, task: "Daily Combo", reward: 5000, type:1, number:3},
        {id: 4, task: "Subscribe to the community", reward: 5000, type:4, number:4},
        {id: 5, task: "Boost to the community", reward: 25000, type:3, number:5},
    ])


    return (
        <div className={`${cl.friends__container} ${cl.mt_20}`}>
            <div className={cl.friends__container__title}>
                Earn more Bonuses
            </div>
            <div className={cl.friends__container__description}>
                Get more bonuses for completing activities!
            </div>
            <EarnList listTasks={tasks} url={url}/>
        </div>
    );
};

export default Earn;