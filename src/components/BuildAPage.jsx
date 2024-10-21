import React from 'react';
import PlayerPanel from "./UI/PlayerPanel/PlayerPanel";
import Exchange from "../pages/Exchange";
import Mine from "../pages/Mine";
import Friends from "../pages/Friends";
import Earn from "../pages/Earn";
import Airdrop from "../pages/Airdrop";

function returnPage(page, player, setBoost, setMinePanel){
    if(page === "exchange"){
        return <Exchange  money={player.money} energy={player.energy} setBoost={setBoost}/>
    } else if(page === "mine"){
        return <Mine  money={player.money} energy={player.energy} setBoost={setBoost} timer={"03:25:30"} setMinePanel={setMinePanel}/>
    } else if(page === "friends"){
        return <Friends/>
    } else if(page === "earn"){
        return <Earn/>
    } else if(page === "airdrop"){
        return <Airdrop/>
    }

}
const BuildAPage = ({player, page, playerPanel,setSettings, setBoost, setProgress, setMinePanel}) => {
    return (
        <div style={{position:"relative"}}>
            {playerPanel ? <PlayerPanel setProgress={setProgress} key={player.id} setSettings={setSettings} player={player}/> : false}
            {returnPage(page, player, setBoost, setMinePanel)}
        </div>
    );
};

export default BuildAPage;