import React from 'react';
import cl from './MineCard.module.css'

const MineCard = ({setMinePanel}) => {
    return (
        <div onClick={() => setMinePanel(true)} className={cl.mineCard__container}>
        </div>
    );
};

export default MineCard;