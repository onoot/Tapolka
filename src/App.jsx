import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import Loading from "./pages/Loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Settings from "./components/UI/Settings/Settings";
import Boost from "./components/UI/Boost/Boost";
import Progress from "./components/UI/Progress/Progress";
import MinePanel from "./components/UI/MinePanel/MinePanel";

// Lazy imports
const Navbar = React.lazy(() => import("./components/UI/Navbar/Navbar"));
const BuildAPage = React.lazy(() => import("./components/BuildAPage"));

function App() {
    // const { user, tg, initData, photoUrl, expand } = useTelegram();
    const { user, tg, photoUrl, expand } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(true);
    const urlBase="https://tongaroo.fun"
    // const urlBase="http://localhost"

    const initData = {"query_id":"AAH-2XhEAAAAAP7ZeETH4IO6","user":{"id":1148770814,"first_name":"overlamer","last_name":"Broken","username":"Crazy_santa","language_code":"ru","allows_write_to_pm":true,"photo_url":"https://t.me/i/userpic/320/XO1rdazihmwfj8CcPcBSmaGmx1WgnQpPp5lJnxAxYQ0.svg"},"auth_date":"1731992070","signature":"1l_D07GmouWIa-mY0nG5EPDfISHvEl2UdYtsm41_M4jqeHlmGK6f2Oq6O6xjePbAsAk4yoo5i-ZRHvx3CF2-Bw","hash":"247557dc49adbf846e3a9ebd2dac18b59e0acde3d4371d8757608c89314aa3d9"}
    
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
            toast.error(e, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }
      
    }, []);

    // Функция для асинхронной загрузки данных игрока
    const fetchPlayerData = async () => {
        try {
            const response = await fetch(`${urlBase}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            if (!response.ok) {
                toast.error(`Error: ${response.status}!`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                return false;
            }

            const data = await response.json();
            if (data.token) 
                localStorage.removeItem('token');
                localStorage.setItem('token', data.token);

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
                key: data.key|| 0,
                daily: JSON.parse(data.combo_daily_tasks||'[]'),
                reward: data.reward || null,
            };
            updatePlayer(playerData);
            setIsLoading(false)
            toast.info('Welcome!', {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
            });
            setIsError(false);
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
        <Settings visible={settings} setVisible={setSettings}/>
        <Boost visible={boost} setVisible={setBoost} money={player.money}/>
        <Progress visible={progress} setVisible={setProgress} player={player}/>
        <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={player.money} url={urlBase}/>
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
                                            url={urlBase}
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
