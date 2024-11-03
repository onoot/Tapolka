import './styles/App.css';
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import Navbar from "./components/UI/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";
import BuildAPage from "./components/BuildAPage";
import Settings from "./components/UI/Settings/Settings";
import Boost from "./components/UI/Boost/Boost";
import Progress from "./components/UI/Progress/Progress";
import MinePanel from "./components/UI/MinePanel/MinePanel";

function App() {
    const { user, tg, initData } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();
    // const initData = { 
    //     "query_id": "AAH-2XhEAAAAAP7ZeESod4dt", 
    //     "user": { 
    //         "id": 1148770814, 
    //         "first_name": "overlamer", 
    //         "last_name": "Broken", 
    //         "username": "Crazy_santa", 
    //         "language_code": "ru", 
    //         "allows_write_to_pm": true 
    //     }, 
    //     "auth_date": "1730518862", 
    //     "hash": "0d177daac8909aa50020cdf260abcaa84b218aaf18e1a8d2c942db2aa0435506" 
    // };

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        tg.ready();
    }, []);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch("http://62.217.181.16/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            const data = await response.json();

            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            const playerData = {
                id: data.id || 1,
                name: data?.name || user?.username || 'Guest',
                role: data.role || 'CEO',
                money: data.money || 0,
                totalMoney: data.totalMoney || 0,
                profit: data.profit || 0,
                energy: data.energy || 1000,
                rank: data.rank || 0,
                benefit: data.benefit || 0,
            };
            console.log(playerData)
            updatePlayer(playerData);
            setIsLoading(false);
            console.log(player)

        } catch (error) {
            console.error("Error fetching player data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayerData();
    }, []);

    return (
        <div className="App">
            {!isLoading && player ? (
                <>
                    <Settings visible={settings} setVisible={setSettings} />
                    <Boost visible={boost} setVisible={setBoost} money={player?.money || 0} />
                    <Progress visible={progress} setVisible={setProgress} player={player || {}} />
                    <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={player?.money || 0} />

                    <BrowserRouter>
                        <Routes>
                            <Route path="exchange" element={<BuildAPage player={player} />} />
                            <Route path="mine" element={<BuildAPage player={player} />} />
                            <Route path="*" element={<BuildAPage player={player} />} />
                        </Routes>
                        <Navbar />
                    </BrowserRouter>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default App;
