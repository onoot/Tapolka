// ButtonWallet.jsx
import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [tonConnectUI] = useTonConnectUI();

    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                setWalletAddress(wallet.account.address);
            } else {
                setWalletAddress(null);
            }
        });

        return () => unsubscribe();
    }, [tonConnectUI]);

    const connectWallet = () => {
        tonConnectUI.connectWallet();
    };
    useEffect(() => {
        if (walletAddress) {
            console.log('Wallet address:', walletAddress);
        }
    }, [walletAddress]);

    return (
        <div className={cl.test}>
            <button className={cl.button_wallet} onClick={connectWallet}>
                {/* Кастомная кнопка */}
            </button>
        </div>
    );
};

export default ButtonWallet;
