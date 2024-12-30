import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';
import { toast } from 'react-toastify';
import {usePlayerStore} from '../../../store/playerStore.mjs'

const ButtonWallet = ({ ton }) => {
    const [walletAddress, setWalletAddress] = useState("no");
    const [tonConnectUI] = useTonConnectUI();
    const { player } = usePlayerStore();

    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                setWalletAddress(wallet.account.address);
            } else {
                setWalletAddress("no");
            }
        });

        return () => unsubscribe();
    }, [tonConnectUI]);

    const walletFetshServer = async (pubkey, option) => {
        const urlBase="https://tongaroo.fun"

        const token = localStorage.getItem('token');
        if (!token) {
            console.error(!token);
            return;
        }
        const response = await fetch(`${urlBase}/api/wallet/${player?.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ wallet: pubkey, connect: option }),
        });

        if (!response.ok) {
            if (response.status === 400) {
                toast.error('Error code 400', { theme: 'dark' });
                return;
            }else if (response.status === 401) {
                toast.error('Error code 401', { theme: 'dark' });
                return;
            }else if(response.status === 500){
                toast.error('Internal server error', { theme: 'dark' });
                return;
            }
        }
        else if(response.status === 200&&walletAddress!="no"){
            const data = await response.json();
            console.log(data);
            toast.info('Wallet connected successfully', { theme: 'dark' });
        }
    };

    const connectWallet = () => {
        const test = tonConnectUI.connectWallet();
        console.log(test)
    };

    const disconnectWallet = () => {
        const test = tonConnectUI.disconnect();
        setWalletAddress(null);
        console.log(test)
    };

    useEffect(() => {
        if (walletAddress) {
            console.log('Wallet address:', walletAddress);
            walletFetshServer(walletAddress, true);
        }else{
            console.log('Wallet address:', walletAddress);
            walletFetshServer(walletAddress, false);
        }
    }, [walletAddress]);

    return (
        <div className={cl.test}>
            {!ton ? (
                  <button className={cl.button_wallet} onClick={connectWallet}>
                    </button>
            ) : (
                <button className={cl.button_wallet} onClick={disconnectWallet}>
                </button>
            )}
        </div>
    );
};

export default ButtonWallet;
