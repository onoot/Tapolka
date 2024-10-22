import React from 'react';
import cl from "./MineMarketType.module.css"
import {changeNavbarAndMine} from "../../hooks/changeNavbarAndMine"

const MineMarketType = ({mas, type}) => {
    return (
        <button onClick={() => changeNavbarAndMine(mas, type.name)} className={ type.isActive ? `${cl.mineMarketType} ${cl.mineMarketType__active}` : cl.mineMarketType}>
            {type.name}
        </button>
    );
};

export default MineMarketType;