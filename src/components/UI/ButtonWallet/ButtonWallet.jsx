import React, { useEffect, useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const [tonConnectUI] = useTonConnectUI();

    useEffect(() => {
        tonConnectUI.setConnectRequestParameters({
            manifestUrl: 'https://app.tongaroo.fun/api/manifest/ton.json'
        });

        const handleStatusChange = ({ address }) => {
            setWalletAddress(address);
        };

        tonConnectUI.onStatusChange(handleStatusChange);

        return () => {
            // Очистка слушателя при размонтировании компонента
            tonConnectUI.offStatusChange(handleStatusChange);
        };
    }, [tonConnectUI]);

    return (
        <div className={cl.test}>
            {walletAddress ? (
                <p>Wallet: {walletAddress}</p>
            ) : (
                <p>Connect Wallet</p>
            )}
            <TonConnectButton 
                className={cl.button_wallet} 
                buttonStyle="custom"          
                theme="dark"                  
            />
        </div>
    );
};

export default ButtonWallet;
