import React from 'react';
import cl from "./PlayerInfo.module.css";
import iconProfit from "./../../images/iconProfit.png"

const PlayerInfo = ({ avatar, player, setProgress }) => {

    return (
        <div className={cl.playerInfo__panel}>
            <div className={cl.playerInfo__panel__item}>
                <div className={cl.playerInfo__panel__item__descriptionPlayer}>
                    <div className={cl.playerInfo__panel__item__icon}>
                        <img className={cl.playerInfo__panel__prifile__icon} src={avatar ? avatar : iconProfit} alt="" />
                    </div>
                    <div className={cl.playerInfo__panel__item__descriptionPlayer__block}>
                        <div className={cl.playerInfo__panel__item__descriptionPlayer__block__name}>
                            {player.name}
                        </div>
                        <div className={cl.playerInfo__panel__item__descriptionPlayer__block__role}>
                            {player.role}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.playerInfo__panel__item}>
                <button onClick={() => setProgress(true)} className={cl.playerInfo__panel__item__levelBlock}>
                    <div className={cl.playerInfo__panel__item__levelBlock__rankBlock}>
                        <div className={cl.playerInfo__panel__item__levelBlock__rankBlock__rankPlayer}>
                            Silver
                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.41667 4.61667L4.50417 2.70417C4.4261 2.62657 4.3205 2.58301 4.21042 2.58301C4.10034 2.58301 3.99474 2.62657 3.91667 2.70417C3.87761 2.74291 3.84662 2.78899 3.82546 2.83976C3.80431 2.89054 3.79342 2.945 3.79342 3C3.79342 3.05501 3.80431 3.10947 3.82546 3.16025C3.84662 3.21102 3.87761 3.2571 3.91667 3.29584L5.83333 5.20417C5.87239 5.24291 5.90339 5.28899 5.92454 5.33976C5.94569 5.39054 5.95658 5.445 5.95658 5.5C5.95658 5.55501 5.94569 5.60947 5.92454 5.66025C5.90339 5.71102 5.87239 5.7571 5.83333 5.79584L3.91667 7.70417C3.83821 7.78208 3.79391 7.88796 3.79352 7.99853C3.79313 8.1091 3.83668 8.21529 3.91459 8.29376C3.99249 8.37221 4.09838 8.41651 4.20895 8.4169C4.31951 8.41729 4.42571 8.37375 4.50417 8.29584L6.41667 6.38334C6.65075 6.14896 6.78224 5.83126 6.78224 5.5C6.78224 5.16875 6.65075 4.85105 6.41667 4.61667Z" fill="white" />
                            </svg>
                        </div>
                        <div className={cl.playerInfo__panel__item__levelBlock__rankBlock__rankPlayerNow}>
                            <span style={{ color: '#fff' }}>1</span>/10
                        </div>

                    </div>
                    <div className={cl.playerInfo__panel__item__levelBlock__progressBar}>

                    </div>
                </button>
            </div>
        </div>
    );
};

export default PlayerInfo;