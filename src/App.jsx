import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Loading from "./pages/Loading";

// Lazy imports
const Navbar = React.lazy(() => import("./components/UI/Navbar/Navbar"));
const BuildAPage = React.lazy(() => import("./components/BuildAPage"));

function App() {
    const { user, tg, initData, photoUrl, expand } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        tg.ready();
        expand();
    }, []);

    useEffect(() => {
        tg.ready();
        expand();

        // Отслеживаем загрузку страницы
        window.addEventListener('load', () => {
            // Скрываем прелоадер после полной загрузки страницы
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
            setIsLoading(false); // Завершаем загрузку данных для приложения
        });

        // Очистка события после размонтирования компонента
        return () => {
            window.removeEventListener('load', () => {});
        };
    }, []);

    // Функция для асинхронной загрузки данных игрока
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
                        <React.Suspense fallback={<Loading />}>
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
                        </React.Suspense>
                    </BrowserRouter>
                )}
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
