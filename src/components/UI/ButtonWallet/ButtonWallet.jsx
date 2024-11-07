// ButtonWallet.jsx
import React, { useState, useRef } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';

const ButtonWallet = () => {
    const [walletAddress, setWalletAddress] = useState(null);
    const buttonRef = useRef(null); 

    const connectWallet = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    };

    // Событие, когда кошелек подключен
    const handleConnect = (wallet) => {
        if (wallet?.account?.address) {
            setWalletAddress(wallet.account.address);
        }
    };

    return (
        <div className={cl.test}>
            {walletAddress ? `Wallet: ${walletAddress}` : "Connect Wallet"}
            
            <button className={cl.button_wallet} onClick={connectWallet}>
            </button>

            <div style={{ opacity: 0, position: 'absolute', pointerEvents: 'none' }}>
                <TonConnectButton 
                    ref={buttonRef} 
                    onConnect={handleConnect}
                    manifestUrl="https://app.tongaroo.fun/api/manifest/ton.json" 
                />
            </div>
        </div>
    );
};

export default ButtonWallet;
