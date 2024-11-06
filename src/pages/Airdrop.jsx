import React from 'react';
import cl from "../styles/friends.module.css";
import Button from "../components/UI/Button/Button";

const Airdrop = () => {
    return (
        <div className={`${cl.friends__container} ${cl.mt_20}`}>
            <div className={cl.friends__container__title}>
                Airdrop Tasks
            </div>
            <div className={cl.friends__container__description}>
                Listing is on its way. Tasks will appear below. Complete them to particvipate in the Airdrop
            </div>
            <div className={cl.airdrop__img}>
                <img src={require("../components/images/airdropMainImg.png")} alt=""/>
            </div>
            <Button text={"Connect your Telegram Wallet"} isImg={false} isFullScreen={true}/>
        </div>
    );
};

export default Airdrop;