import './styles/App.css';
import React, { useEffect, useState } from "react";
import Navbar from "./components/UI/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./pages/Loading";
import BuildAPage from "./components/BuildAPage";
import Settings from "./components/UI/Settings/Settings";
import Boost from "./components/UI/Boost/Boost";
import Progress from "./components/UI/Progress/Progress";
import MinePanel from "./components/UI/MinePanel/MinePanel";
import {useTelegram} from "./components/hooks/useTelegram";
import Headers from "./components/header/header";

function App() {
    class Player {
        constructor(id, name, role, money, totalMoney, profit, energy, rank, benefit) {
            this.id = id;
            this.name = name;
            this.role = role;
            this.money = money;
            this.totalMoney = totalMoney;
            this.profit = profit;
            this.energy = energy;
            this.rank = rank;
            this.benefit = benefit;
        }
    }

    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [player, setPlayer] = useState(null);  
    const [isLoading, setIsLoading] = useState(true); 

    const {onToggleButton, tg} = useTelegram();

    useEffect(() => {
        tg.ready();
    }, [])

    useEffect(() => {
       

        const fetchPlayerData = async () => {
            try {
                 // Создание объекта игрока с данными
                 const newPlayer = new Player(
                    loginData.user.id,
                    loginData.user.firstName,
                    '...',  // Это роль можно изменить, если нужно
                    coinsData.coins[0]?.amount || 0,
                    0,  // totalMoney - можно изменить на значение из базы
                    0,    // profit - можно изменить на значение из базы
                    0,     // energy - можно изменить на значение из базы
                    0,        // rank - можно изменить на значение из базы
                    0      // benefit - можно изменить на значение из базы
                );
                setPlayer(newPlayer);  // Устанавливаем данные игрока
                setIsLoading(false);  // Отключаем прелоадер
            } catch (error) {
                console.error('Error fetching data:', error);
                // setIsLoading(false);  // Отключаем прелоадер, даже если есть ошибка
            }
        };

        fetchPlayerData();
    }, []);

    return (
        <div className="App">
            <Headers/>
            {isLoading ? (
                <Loading />  // Прелоадер отображается, пока идет загрузка
            ) : (
                <>
                    <Settings visible={settings} setVisible={setSettings} />
                    <Boost visible={boost} setVisible={setBoost} money={player.money} />
                    <Progress visible={progress} setVisible={setProgress} player={player} />
                    <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={player.money} />
                    <BrowserRouter>
                        <Routes>
                            <Route path={"exchange"} element={<BuildAPage player={player} page={"exchange"} playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} />} />
                            <Route path={"mine"} element={<BuildAPage player={player} page={"mine"} playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} setMinePanel={setMinePanel} />} />
                            <Route path={"friends"} element={<BuildAPage player={player} page={"friends"} playerPanel={false} />} />
                            <Route path={"earn"} element={<BuildAPage player={player} page={"earn"} playerPanel={false} />} />
                            <Route path={"airdrop"} element={<BuildAPage player={player} page={"airdrop"} playerPanel={false} />} />
                            <Route path={"*"} element={<BuildAPage player={player} page={"exchange"} playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} />} />
                        </Routes>
                        <Navbar />
                    </BrowserRouter>
                </>
            )}
        </div>
    );
}

export default App;
