import React from 'react';
import cl from "../styles/friends.module.css";
import { TonConnectButton } from '@tonconnect/ui-react';
import ButtonWallet from '../components/UI/ButtonWallet/ButtonWallet';

const Airdrop = () => {
    return (
        <div className={`${cl.friends__container} ${cl.mt_20} ${cl.mb_20}`}>
            <div className={cl.friends__container__title}>
                Airdrop Tasks
            </div>
            <div className={cl.friends__container__description}>
                Listing is on its way. Tasks will appear below. Complete them to participate in the Airdrop
            </div>
            <div className={cl.airdrop__img}>
                <img src={require("../components/images/airdropMainImg.png")} alt=""/>
            </div>
            <div className={`${cl.button_full_width} ${cl.dflex_justifycenter}`}>
                <TonConnectButton className={`${cl.ton_connect_button}`} />
            </div>
            <ButtonWallet ton={true} />
        </div>
    );
};

export default Airdrop;
