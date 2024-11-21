import React, { Suspense } from 'react';
import PlayerPanel from "./UI/PlayerPanel/PlayerPanel";

const Exchange = React.lazy(() => import("../pages/Exchange"));
const Mine = React.lazy(() => import("../pages/Mine"));
const Friends = React.lazy(() => import("../pages/Friends"));
const Earn = React.lazy(() => import("../pages/Earn"));
const Airdrop = React.lazy(() => import("../pages/Airdrop"));

function returnPage(page, player, setPlayer, setBoost, setMinePanel, url) {
    if (page === "exchange") {
        return (
            <Exchange
                player={player}
                setPlayer={setPlayer}
                money={player.money}
                energy={player.energy}
                setBoost={setBoost}
                url={url}
            />
        );
    } else if (page === "mine") {
        return (
            <Mine
                money={player.money}
                energy={player.energy}
                setBoost={setBoost}
                timer={"03:25:30"}
                setMinePanel={setMinePanel}
            />
        );
    } else if (page === "friends") {
        return <Friends url={url}/>;
    } else if (page === "earn") {
        return <Earn url={url}/>;
    } else if (page === "airdrop") {
        return <Airdrop url={url}/>;
    }
    console.log(page);
}

const BuildAPage = ({
    avatar,
    player,
    setPlayer,
    page,
    playerPanel,
    setSettings,
    setBoost,
    setProgress,
    setMinePanel,
    url
}) => {

    return (
        <div style={{ position: "relative" }}>
            {playerPanel && (
                <PlayerPanel
                    avatar={avatar}
                    setProgress={setProgress}
                    key={player.id}
                    setSettings={setSettings}
                    player={player}
                />
            )}
            <Suspense fallback={<div>Loading...</div>}>
                {returnPage(page, player, setPlayer, setBoost, setMinePanel, url)}
            </Suspense>
        </div>
    );
};

export default BuildAPage;
