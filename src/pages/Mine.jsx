import React, {useState} from 'react';
import cl from "../styles/mine.module.css";
import clSecond from "../styles/mainPanel.module.css";
import Button from "../components/UI/Button/Button";
import MineCard from "../components/UI/MineCard/MineCard";
import Money from "../components/UI/Money/Money";
import MineMarketList from "../components/UI/MineMarketList/MineMarketList";


const Mine = ({timer, money, energy, setMinePanel, setBoost}) => {


    return (
        <div className={clSecond.mainPanel}>
            <div className={cl.mine__container}>
                <div className={cl.mine__container__timer}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16C9.58225 16 11.129 15.5308 12.4446 14.6518C13.7602 13.7727 14.7855 12.5233 15.391 11.0615C15.9965 9.59966 16.155 7.99113 15.8463 6.43928C15.5376 4.88743 14.7757 3.46197 13.6569 2.34315C12.538 1.22433 11.1126 0.462403 9.56072 0.153721C8.00887 -0.15496 6.40034 0.00346629 4.93853 0.608967C3.47672 1.21447 2.22729 2.23985 1.34824 3.55544C0.469192 4.87104 0 6.41775 0 8C0.00229405 10.121 0.845886 12.1545 2.34568 13.6543C3.84547 15.1541 5.87897 15.9977 8 16ZM8 3.33334C8.19778 3.33334 8.39112 3.39199 8.55557 3.50187C8.72002 3.61175 8.84819 3.76793 8.92388 3.95065C8.99957 4.13338 9.01937 4.33445 8.98079 4.52843C8.9422 4.72241 8.84696 4.90059 8.70711 5.04044C8.56726 5.1803 8.38907 5.27554 8.19509 5.31412C8.00111 5.35271 7.80004 5.3329 7.61732 5.25722C7.43459 5.18153 7.27841 5.05336 7.16853 4.88891C7.05865 4.72446 7 4.53112 7 4.33334C7 4.06812 7.10536 3.81377 7.29289 3.62623C7.48043 3.43869 7.73478 3.33334 8 3.33334ZM7.33333 6.66667H8C8.35362 6.66667 8.69276 6.80715 8.94281 7.0572C9.19286 7.30724 9.33333 7.64638 9.33333 8V12C9.33333 12.1768 9.2631 12.3464 9.13807 12.4714C9.01305 12.5964 8.84348 12.6667 8.66667 12.6667C8.48986 12.6667 8.32029 12.5964 8.19526 12.4714C8.07024 12.3464 8 12.1768 8 12V8H7.33333C7.15652 8 6.98695 7.92977 6.86193 7.80474C6.73691 7.67972 6.66667 7.51015 6.66667 7.33334C6.66667 7.15653 6.73691 6.98696 6.86193 6.86193C6.98695 6.73691 7.15652 6.66667 7.33333 6.66667Z" fill="#8E8E8E"/>
                    </svg>
                    {timer}
                </div>
                <div className={cl.mine__container__dailyCombo}>
                    <div className={cl.mine__container__dailyCombo__items}>
                        <div>Daily combo</div>
                        <Button text={"5,000,000"} isImg={true} isFullScreen={false}/>
                    </div>
                    <div className={cl.mine__container__dailyCombo__items}>
                        <MineCard setMinePanel={setMinePanel}/>
                        <MineCard setMinePanel={setMinePanel}/>
                        <MineCard setMinePanel={setMinePanel}/>
                    </div>
                </div>
                <Money money={money}/>
                <MineMarketList/>
            </div>
        </div>
    );
};

export default Mine;