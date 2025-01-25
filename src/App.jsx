import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { usePlayerStore } from "./store/playerStore.mjs";
import { useTelegram } from "./components/hooks/useTelegram";
import { useTranslation } from "./hooks/useTranslation";
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
    const { user, tg, initData, photoUrl, expand } = useTelegram();
    // const { user, tg, photoUrl, expand } = useTelegram();
    const { player, updatePlayer } = usePlayerStore();

    //const initData = {"query_id":"AAH-2XhEAAAAAP7ZeETH4IO6","user":{"id":1148770814,"first_name":"overlamer","last_name":"Broken","username":"Crazy_santa","language_code":"ru","allows_write_to_pm":true,"photo_url":"https://t.me/i/userpic/320/XO1rdazihmwfj8CcPcBSmaGmx1WgnQpPp5lJnxAxYQ0.svg"},"auth_date":"1731992070","signature":"1l_D07GmouWIa-mY0nG5EPDfISHvEl2UdYtsm41_M4jqeHlmGK6f2Oq6O6xjePbAsAk4yoo5i-ZRHvx3CF2-Bw","hash":"247557dc49adbf846e3a9ebd2dac18b59e0acde3d4371d8757608c89314aa3d9"}
   
    const [settings, setSettings] = useState(false);
    const [isError, setIsError] = React.useState(true);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const urlBase="https://tongaroo.fun"

    const telegramLanguage = initData?.user?.language_code;
    const language = localStorage.getItem('language') || telegramLanguage;
    const { t } = useTranslation(language);
    localStorage.setItem('language', language);

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
            const params = new URLSearchParams(initData);
            const parsedData = {
                query_id: params.get('query_id'),
                user: JSON.parse(decodeURIComponent(params.get('user'))),
                auth_date: params.get('auth_date'),
                hash: params.get('hash'),
                signature: params.get('signature')
            };

            // Отправляем как JSON
            const response = await fetch(`${urlBase}/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(parsedData)
            });

            if (!response.ok) {
                toast.error(`Error: ${response.status}!`, {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                });
                setIsError(true);
                setIsLoading(false);
                return;
            }
    
            const data = await response.json();
            console.log('Response data:', data);
    
            if (data.token) {
                localStorage.setItem('token', data.token);
            } else {
                console.warn('Token is missing in response');
            }
    
            const playerData = {
                id: data.id || 1,
                name: data.name || user?.username || 'Guest',
                role: data.role || 'CEO',
                money: data.money || 0,
                totalMoney: data.totalMoney || 0,
                profit: data.profit || 0,
                energy: data.energy || 0,
                rank: data.rank || 0,
                benefit: data.benefit || 0,
                key: data.key || 0,
                daily: data.combo_daily_tasks || [],
                reward: data.reward || null,
                wallet: data.wallet || null,
                boost: data?.boost || null,
                combo_count: data?.combo_count || 0
            };
    
            console.log('Player data:', playerData);
    
            updatePlayer(playerData);
            setIsLoading(false);
            setIsError(false);
    
            toast.info(t('App.toasts.welcome'), {
                position: 'top-right',
                autoClose: 3000,
                theme: 'dark',
              });
            
              if (tg?.HapticFeedback?.impactOccurred) {
                tg.HapticFeedback.impactOccurred('medium'); 
              } else {
                toast.info(t('App.errors.hapticFeedback'), {
                  position: 'top-right',
                  autoClose: 3000,
                  theme: 'dark',
                });
                console.warn(t('App.errors.hapticFeedback'));
              }
            
        } catch (error) {
            console.error('Error during fetchPlayerData:', error);
            toast.error(`Error: ${error.message}`, {
                position: 'top-right',
                autoClose: 5000,
                theme: 'dark',
            });
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
                    <>
                    <Settings visible={settings} setVisible={setSettings}/>
                    <Boost visible={boost} setVisible={setBoost} money={player.money}/>
                    <Progress visible={progress} setVisible={setProgress} player={player} url={urlBase}/>
                    <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={player.money} url={urlBase}/>
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
                                    path="farm"
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
                                    path="drop"
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
                    </>
                )}
            </div>
        </TonConnectUIProvider>
    );
}

export default App;
