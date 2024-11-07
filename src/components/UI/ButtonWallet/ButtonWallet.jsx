import React, { useState, useEffect } from 'react';
import { TonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const tonConnectUI = new TonConnectUI({ manifestUrl: 'https://app.tongaroo.fun/api/manifest/ton.json' });

    const connectWallet = async () => {
        try {
            const wallet = await tonConnectUI.connectWallet(); // Ожидаем подключения
            if (wallet?.account?.address) {
                setWalletAddress(wallet.account.address);
            }
        } catch (error) {
            console.error("Ошибка подключения кошелька:", error);
        }
    };

    return (
        <div className={cl.test}>
            {walletAddress ? `Wallet: ${walletAddress}` : "Connect Wallet"}
            {/* Кастомная кнопка */}
            <button className={cl.button_wallet} onClick={connectWallet}></button>
        </div>
    );
};

export default ButtonWallet;
