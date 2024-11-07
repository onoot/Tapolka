// ButtonWallet.jsx
import React, { useEffect, useState } from 'react';
import { TonConnectUI, TonConnect } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const tonConnect = new TonConnect();

    useEffect(() => {
        tonConnect.restoreConnection().then((wallet) => {
            if (wallet) {
                setWalletAddress(wallet.account.address);
            }
        });
    }, [tonConnect]);

    const connectWallet = async () => {
        try {
            // Устанавливаем соединение с кошельком
            const wallet = await tonConnect.connectWallet({
                manifestUrl: 'https://app.tongaroo.fun/api/manifest/ton.json'
            });
            setWalletAddress(wallet.account.address);
        } catch (error) {
            console.error("Ошибка подключения кошелька:", error);
        }
    };

    return (
        <div className={cl.test}>
            {/* Отображаем кастомную кнопку */}
            {walletAddress ? `Wallet: ${walletAddress}` : "Connect Wallet"}
            <button className={cl.button_wallet} onClick={connectWallet}>
                {/* Ваша кастомная кнопка */}
            </button>
        </div>
    );
};

export default ButtonWallet;
