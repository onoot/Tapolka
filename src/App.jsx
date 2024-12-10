import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Loading from "./pages/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy imports
const Navbar = React.lazy(() => import("./components/UI/Navbar/Navbar"));
const BuildAPage = React.lazy(() => import("./components/BuildAPage"));

function App() {
    const { user, tg, initData, photoUrl, expand } = useTelegram();
    // const { user, tg, photoUrl, expand } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);
    // const urlBase="https://tongaroo.fun"
    const urlBase="http://localhost"

    
    useEffect(() => {
        tg.ready();
        expand();
    }, []);

    useEffect(() => {
        try{
            if(!isError){
                window.addEventListener('load', () => {
                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                    setIsLoading(false); 
                });
                return () => {
                    window.removeEventListener('load', () => {});
                };
            }
        }catch(e){
            console.log(e)
            toast.error(e)
        }
      
    }, []);

    // Функция для асинхронной загрузки данных игрока
    const fetchPlayerData = async () => {
        toast.info('Загрузка данных игрока...');
        try {
            const response = await fetch(`${urlBase}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            if (!response.ok) {
                toast.error('Ошибка при загрузке данных!');
                return false;
            }

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
            setIsLoading(false)
            toast.success('Данные игрока успешно загружены!');
        } catch (error) {
            toast.error(`Ошибка: ${error.message}`);
            setIsLoading(true);
            setIsError(true);
        }
    };

    useEffect(() => {
        fetchPlayerData();
    }, []);

    return (
        <TonConnectUIProvider manifestUrl={`${urlBase}/manifest.json`}>
            <div className="App">
            <ToastContainer />
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
                                            url={urlBase}
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
                                            url={urlBase}
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
                                            url={urlBase}
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
                                            url={urlBase}
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
                                            url={urlBase}
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
