import React, { useEffect, useState, Suspense, lazy } from "react";
import './styles/App.css';
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import Loading from "./pages/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// Lazy imports
const Navbar = lazy(() => import("./components/UI/Navbar/Navbar"));
const BuildAPage = lazy(() => import("./components/BuildAPage"));
const Settings = lazy(() => import("./components/UI/Settings/Settings"));
const Boost = lazy(() => import("./components/UI/Boost/Boost"));
const Progress = lazy(() => import("./components/UI/Progress/Progress"));
const MinePanel = lazy(() => import("./components/UI/MinePanel/MinePanel"));

function App() {
    const { user, tg, initData, photoUrl, expand } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        tg.ready();
        expand();
    }, []);

    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`https://tongaroo.fun/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            if (!response.ok) throw new Error("Failed to fetch player data");

            const data = await response.json();
            if (data.token) localStorage.setItem('token', data.token);

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
            updatePlayer(playerData);
        } catch (error) {
            console.error("Error fetching player data:", error);
        } finally {
            setIsLoading(false); // завершить загрузку независимо от результата
        }
    };

    useEffect(() => {
        fetchPlayerData();
    }, []);

    return (
        <TonConnectUIProvider manifestUrl={`https://tongaroo.fun/manifest.json`}>
            <div className="App">
                {isLoading ? (
                    <Loading />
                ) : (
                    <BrowserRouter>
                        <Suspense fallback={<Loading />}>
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
                                <Route
                                    path="*"
                                    element={
                                        <BuildAPage
                                            avatar={photoUrl || null}
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
                        </Suspense>
                    </BrowserRouter>
                )}
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
