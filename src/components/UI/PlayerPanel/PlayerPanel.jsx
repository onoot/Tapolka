import React, {useState} from 'react';
import cl from './PlayerPanel.module.css'
import PlayerInfo from "../PlayerInfo/PlayerInfo";
import PlayerProfit from "../PlayerProfit/PlayerProfit";
import Settings from "../Settings/Settings";

const PlayerPanel = ({avatar, player, setSettings, setProgress}) => {
    return (
        <div className={cl.playerPanel__container}>
            <PlayerInfo avatar={avatar} player={player} setProgress={setProgress}/>
            <PlayerProfit profit={player.key} setSettings={setSettings}/>
        </div>
    );
};

export default PlayerPanel;