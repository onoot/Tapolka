import React, { useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const tonConnect = new TonConnect();

    const connectWallet = async () => {
        try {
            // Установка соединения с кошельком
            const wallet = await tonConnect.connect({
                manifestUrl: 'https://app.tongaroo.fun/api/manifest/ton.json'
            });

            console.log(wallet);
            // Получение информации о кошельке пользователя
            const walletInfo = tonConnect.wallet;
            if (walletInfo) {
                console.log(walletInfo);
                setWalletAddress(walletInfo.address); // Сохраняем адрес кошелька в состояние
            }
        } catch (error) {
            console.error("Ошибка подключения кошелька:", error);
        }
    };

    return (
        <div className={cl.test}>
            {walletAddress ? `Wallet: ${walletAddress}` : "Connect Wallet"}
            <button className={cl.button_wallet} onClick={connectWallet}>
            </button>
        </div>
    );
};

export default ButtonWallet;
