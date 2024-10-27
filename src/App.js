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
import { useTelegram } from "./components/hooks/useTelegram.js";

function App() {
    const { user, onClose, onToggleButton, tg, initData } = useTelegram();

    
    const [settings, setSettings] = useState(false);
    const [boost, setBoost] = useState(false);
    const [progress, setProgress] = useState(false);
    const [minePanel, setMinePanel] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Определяем класс игрока
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
    useEffect(() => {
        tg.ready();
    }, [])
    fetch("https://jsonplaceholder.typicode.com/todos/1",{
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(initData),
    })


    // Инициализация игрока с тестовыми данными для локальной отладки
    const [player, setPlayer] = useState(
        new Player(
            1,
            user?.username || 'Guest',
            'CEO',  // Роль игрока по умолчанию
            0,
            0,  // totalMoney
            0,  // profit
            1000,  // energy
            0,  // rank
            0   // benefit
        )
    );


    useEffect(() => {
        const fetchPlayerData = async () => {
            try {
                // Устанавливаем тестового игрока
                setPlayer(player);
                setIsLoading(false);  // Прелоадер выключен
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPlayerData();
    }, []);

    return (
        <div className="App">
            {isLoading ? (
                <Loading />  // Прелоадер отображается, пока идет загрузка
            ) : (
                <>
                    <Settings visible={settings} setVisible={setSettings} />
                    <Boost visible={boost} setVisible={setBoost} money={player.money} />
                    <Progress visible={progress} setVisible={setProgress} player={player} />
                    {"dsad "+initData}
                    <MinePanel minePanel={minePanel} setMinePanel={setMinePanel} money={player.money} />
                    <BrowserRouter>
                        <Routes>
                            <Route path="exchange" element={<BuildAPage player={player} setPlayer={setPlayer} page="exchange" playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} />} />
                            <Route path="mine" element={<BuildAPage player={player} page="mine" playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} setMinePanel={setMinePanel} />} />
                            <Route path="friends" element={<BuildAPage player={player} page="friends" playerPanel={false} />} />
                            <Route path="earn" element={<BuildAPage player={player} page="earn" playerPanel={false} />} />
                            <Route path="airdrop" element={<BuildAPage player={player} page="airdrop" playerPanel={false} />} />
                            <Route path="*" element={<BuildAPage player={player} page="exchange" playerPanel={true} setSettings={setSettings} setBoost={setBoost} setProgress={setProgress} />} />
                        </Routes>
                        <Navbar />
                    </BrowserRouter>
                </>
            )}
        </div>
    );
}

export default App;
