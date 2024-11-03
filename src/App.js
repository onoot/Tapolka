import './styles/App.css';
import React, { useEffect, useState } from "react";
import { usePlayerStore } from "./store/playerStore";
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
    const { playerData, setPlayer } = usePlayerStore();

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        tg.ready();
    }, []);

    // Обновленный fetchPlayerData в App.js
    const fetchPlayerData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(initData),
            });
            const data = await response.json();

            if (data.token) {
                // Сохраняем токен в localStorage
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

            setPlayer(playerData);
            setIsLoading(false);
        } catch (error) {
            console.error("Ошибка при получении данных игрока:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPlayerData();
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Settings visible={settings} setVisible={setSettings} />
                    <Boost visible={boost} setVisible={setBoost} money={playerData.money} />
                    <Progress visible={progress} setVisible={setProgress} player={playerData} />
                    <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={playerData.money} />
                    <BrowserRouter>
                        <Routes>
                            <Route path="exchange" element={<BuildAPage player={playerData} />} />
                            <Route path="mine" element={<BuildAPage player={playerData} />} />
                            <Route path="*" element={<BuildAPage player={playerData} />} />
                        </Routes>
                        <Navbar />
                    </BrowserRouter>
                </>
            )}
        </div>
    );
}

export default App;
