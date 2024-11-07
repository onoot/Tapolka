// ButtonWallet.jsx
import React, { useState } from 'react';
import { TonConnect } from '@tonconnect/sdk';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const tonConnect = new TonConnect();

    const connectWallet = async () => {
        try {
            // Инициализация соединения с кошельком
            await tonConnect.connectWallet();

            // Получение информации о кошельке пользователя
            const walletInfo = tonConnect.getWallet();
            if (walletInfo) {
                setWalletAddress(walletInfo.address); // Сохраняем адрес кошелька в состояние
            }
        } catch (error) {
            console.error("Ошибка подключения кошелька:", error);
        }
    };

    return (
        <div>
            <button className={cl.button_wallet} onClick={connectWallet}>
                {walletAddress ? `Wallet: ${walletAddress}` : "Connect Wallet"}
            </button>
        </div>
    );
}

export default ButtonWallet;
