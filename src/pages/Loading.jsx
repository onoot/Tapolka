import React from 'react';
import cl from "../styles/loading.module.css"

const Loading = () => {
    return (
        <div className={cl.loading__background}>
            <img className={cl.background} src={require("../components/images/loadingBackground.png")} alt=""/>

            <div className={cl.loading__title}>
                Farm $TOGO
            </div>
            <img className={cl.loading__anim} src={require("../components/images/loading.webp")} alt=""/>
            <div className={cl.loading__titleTwo}>
                T2E <span className={cl.purple}>TOGO</span> and don't wait for <span className={cl.yellow}>FOMO</span>
            </div>

        </div>
    );
};

export default Loading;