import React from 'react';
import cl from './PlayerProfit.module.css';
import iconProfit from "./../../images/iconProfit.png"
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { useTranslation } from '../../../hooks/useTranslation';

const PlayerProfit = ({setSettings}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    const {player} = usePlayerStore((state) => state);

    return (
        <div className={cl.playerProfit__container}>
            <div className={cl.playerProfit__container__block}>
                <div className={cl.playerProfit__container__block__item}>
                    <img className={cl.playerProfit__container__item__icon} src={iconProfit} alt=""/>
                </div>
                <div className={cl.playerProfit__container__block__item}>
                    <div className={cl.playerProfit__container__block__item__profitInfo__text}>
                        {t('PlayerProfit.lootbox')}
                    </div>
                    <div className={cl.playerProfit__container__block__item__profitInfo}>
                        <img className={cl.PlayerProfit__key} src={require("./../../images/chest.png")} alt="" />
                        {player.key}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16C9.58225 16 11.129 15.5308 12.4446 14.6518C13.7602 13.7727 14.7855 12.5233 15.391 11.0615C15.9965 9.59966 16.155 7.99113 15.8463 6.43928C15.5376 4.88743 14.7757 3.46197 13.6569 2.34315C12.538 1.22433 11.1126 0.462403 9.56072 0.153721C8.00887 -0.15496 6.40034 0.00346629 4.93853 0.608967C3.47672 1.21447 2.22729 2.23985 1.34824 3.55544C0.469192 4.87104 0 6.41775 0 8C0.00229405 10.121 0.845886 12.1545 2.34568 13.6543C3.84547 15.1541 5.87897 15.9977 8 16ZM8 3.33334C8.19778 3.33334 8.39112 3.39199 8.55557 3.50187C8.72002 3.61175 8.84819 3.76793 8.92388 3.95065C8.99957 4.13338 9.01937 4.33445 8.98079 4.52843C8.9422 4.72241 8.84696 4.90059 8.70711 5.04044C8.56726 5.1803 8.38907 5.27554 8.19509 5.31412C8.00111 5.35271 7.80004 5.3329 7.61732 5.25722C7.43459 5.18153 7.27841 5.05336 7.16853 4.88891C7.05865 4.72446 7 4.53112 7 4.33334C7 4.06812 7.10536 3.81377 7.29289 3.62623C7.48043 3.43869 7.73478 3.33334 8 3.33334ZM7.33333 6.66667H8C8.35362 6.66667 8.69276 6.80715 8.94281 7.0572C9.19286 7.30724 9.33333 7.64638 9.33333 8V12C9.33333 12.1768 9.2631 12.3464 9.13807 12.4714C9.01305 12.5964 8.84348 12.6667 8.66667 12.6667C8.48986 12.6667 8.32029 12.5964 8.19526 12.4714C8.07024 12.3464 8 12.1768 8 12V8H7.33333C7.15652 8 6.98695 7.92977 6.86193 7.80474C6.73691 7.67972 6.66667 7.51015 6.66667 7.33334C6.66667 7.15653 6.73691 6.98696 6.86193 6.86193C6.98695 6.73691 7.15652 6.66667 7.33333 6.66667Z" fill="#8E8E8E"/>
                        </svg>
                    </div>
                </div>
                <button 
                    onClick={() => setSettings(true)} 
                    className={`${cl.playerProfit__container__block__item} ${cl.playerProfit__settingBtn}`}
                    aria-label={t('PlayerProfit.settings')}
                >
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.339177 15C1.02847 16.1963 2.55711 16.6073 3.75344 15.918L3.75586 15.9166L4.12668 15.7025C4.82668 16.3014 5.63128 16.7658 6.5 17.0725V17.5C6.5 18.8807 7.61929 20 9 20C10.3807 20 11.5 18.8807 11.5 17.5V17.0725C12.3688 16.7654 13.1735 16.3003 13.8733 15.7008L14.2458 15.9158C15.4424 16.6062 16.9721 16.1958 17.6625 14.9991C18.3528 13.8025 17.9425 12.2728 16.7458 11.5825L16.3758 11.3691C16.5424 10.4628 16.5424 9.53376 16.3758 8.62746L16.7458 8.41414C17.9424 7.72379 18.3528 6.1941 17.6625 4.99746C16.9721 3.80086 15.4425 3.39043 14.2458 4.08078L13.875 4.29496C13.1743 3.69679 12.3691 3.23319 11.5 2.9275V2.5C11.5 1.1193 10.3807 0 9 0C7.61929 0 6.5 1.1193 6.5 2.5V2.9275C5.63115 3.23463 4.82654 3.69967 4.12668 4.29918L3.75418 4.08336C2.55754 3.39297 1.02785 3.8034 0.337498 5C-0.352854 6.1966 0.0575367 7.72633 1.25418 8.41668L1.62418 8.63C1.45762 9.5363 1.45762 10.4654 1.62418 11.3717L1.25418 11.585C0.0608571 12.2772 -0.348205 13.8039 0.339177 15ZM9 6.66668C10.8409 6.66668 12.3333 8.15906 12.3333 10C12.3333 11.8409 10.8409 13.3333 9 13.3333C7.15906 13.3333 5.66668 11.8409 5.66668 10C5.66668 8.15906 7.15906 6.66668 9 6.66668Z" fill="white"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PlayerProfit;