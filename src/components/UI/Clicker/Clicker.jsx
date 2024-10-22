import React from 'react';
import cl from "./Clicker.module.css";

const Clicker = () => {
    return (
        <div className={cl.container__clicker}>
            <div className={cl.clicker__btn}>
                <img src={require('../../images/clickerBtn.png')} alt=""/>
            </div>
        </div>
    );
};

export default Clicker;