import React, {useState} from 'react';
import cl from "../Settings/Settings.module.css";
import ButtonClose from "../ButtonSettingBack/ButtonClose";
import clD from "./Progress.module.css";
import ProgressItem from "../ProgressItem/ProgressItem";

const Progress = ({visible, setVisible, player}) => {
    const [users, setUsers] = useState([
        {
            id:1, name: "Lara Croft", benefit:128000, rank:8
        },
        {
            id:2, name: "Lara Croft", benefit:1200, rank:3
        },
        {
            id:3, name: "Lara Croft", benefit:1200, rank:3
        },
        {
            id:4, name: "Lara Croft", benefit:1200, rank:11
        },
        {
            id:5, name: "Lara Croft", benefit:1200, rank:3
        },
        {
            id:6, name: "Lara Croft", benefit:1200, rank:3
        },
        {
            id:7, name: "Lara Croft", benefit:1200, rank:3
        },
    ])

    const rootClasses = [clD.settings__container]
    if(visible === true){
        rootClasses.push(clD.active)
    }
    return (
        <div>
            <div className={rootClasses.join(" ")}>
                <div className={cl.settings__container__titlePanel}>
                    <ButtonClose setVisible={setVisible}/>
                    <div className={cl.settings__container__title}>
                        Progress
                    </div>
                </div>
                <div className={clD.progress__container}>
                    <div className={clD.progress__container__img}>
                        <img src={require("../../images/progressKangaroo.png")} alt=""/>
                    </div>
                    <div className={clD.progress__container__rank}>
                        Silver
                    </div>
                    <div className={clD.progress__container__count}>
                        7.47M / 10M
                    </div>
                    <div className={clD.progress__progressBar}>
                    </div>
                </div>
                <div className={cl.settings__container__settingBlock}>
                    {users.map((prop) => {
                        return (
                            <ProgressItem  key={prop.id} prop={prop}/>
                        )
                    })}
                </div>
                <div className={clD.progress__user}>
                    <ProgressItem key={player.id} prop={player}/>
                </div>
            </div>
        </div>
    );
};

export default Progress;