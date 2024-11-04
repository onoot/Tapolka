import React from 'react';
import PlayerPanel from "./UI/PlayerPanel/PlayerPanel";
import Exchange from "../pages/Exchange";
import Mine from "../pages/Mine";
import Friends from "../pages/Friends";
import Earn from "../pages/Earn";
import Airdrop from "../pages/Airdrop";

function returnPage(page, player, setPlayer, setBoost, setMinePanel){
    if(page === "exchange"){
        return <Exchange player={player} setPlayer={setPlayer}  money={player.money} energy={player.energy} setBoost={setBoost}/>
    } else if(page === "mine"){
        return <Mine  money={player.money} energy={player.energy} setBoost={setBoost} timer={"03:25:30"} setMinePanel={setMinePanel}/>
    } else if(page === "friends"){
        return <Friends/>
    } else if(page === "earn"){
        return <Earn/>
    } else if(page === "airdrop"){
        return <Airdrop/>
    }
console.log(page)
}
const BuildAPage = ({avatar, player, setPlayer, page, playerPanel,setSettings, setBoost, setProgress, setMinePanel}) => {
    return (
        <div style={{position:"relative"}}>
            {playerPanel ? <PlayerPanel
                avatar={avatar}
                setProgress={setProgress}
                key={player.id}
                setSettings={setSettings}
                player={player} />
                : false}
            {returnPage(page, player, setPlayer, setBoost, setMinePanel)}
        </div>
    );
};

export default BuildAPage;