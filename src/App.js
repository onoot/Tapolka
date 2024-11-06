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
    const { user, tg, initData, photoUrl } = useTelegram(); 
    const { player, updatePlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        tg.ready(); 

        // Используем фиктивные данные вместо вызова API
        // const playerData = {
        //     id: 1,
        //     name: 'Guest',
        //     role: 'CEO',
        //     money: 1000,
        //     totalMoney: 5000,
        //     profit: 300,
        //     energy: 1000,
        //     rank: 5,
        //     benefit: 200,
        // };
        // updatePlayer(playerData);
    }, []);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch("https://app.tongaroo.fun/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            if (!response.ok) {
                return false
            }
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
                            <Route
                                path="exchange"
                                element={
                                    <BuildAPage
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="exchange"
                                        playerPanel={true}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                    />
                                }
                            />
                            <Route
                                path="mine"
                                element={
                                    <BuildAPage
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="mine"
                                        playerPanel={true}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                        setMinePanel={setMinePanel}
                                    />
                                }
                            />
                            <Route
                                path="friends"
                                element={
                                    <BuildAPage
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="friends"
                                        playerPanel={false}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                    />
                                }
                            />
                            <Route
                                path="earn"
                                element={
                                    <BuildAPage
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="earn"
                                        playerPanel={false}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                    />
                                }
                            />
                            <Route
                                path="airdrop"
                                element={
                                    <BuildAPage
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="airdrop"
                                        playerPanel={false}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                    />
                                }
                            />
                            {/* Резервный маршрут для неизвестных страниц */}
                            <Route
                                path="*"
                                element={
                                    <BuildAPage
                                        avatar={photoUrl||null}
                                        player={player}
                                        setPlayer={updatePlayer}
                                        page="exchange" 
                                        playerPanel={true}
                                        setSettings={setSettings}
                                        setBoost={setBoost}
                                        setProgress={setProgress}
                                    />
                                }
                            />
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
