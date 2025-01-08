import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';
import { toast } from 'react-toastify';
import { usePlayerStore } from '../../../store/playerStore.mjs';

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
    const urlBase = "https://tongaroo.fun";
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found');
      return;
    }

    try {
      const response = await fetch(`${urlBase}/api/wallet/${player?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ wallet: pubkey, connect: option }),
      });

      if (!response.ok) {
        const errorMessage = `Error code ${response.status}`;
        toast.error(errorMessage, { theme: 'dark' });
        return;
      }

      if (response.status === 200 && walletAddress !== "no") {
        const data = await response.json();
        console.log(data);
        toast.info('Wallet connected successfully', { theme: 'dark' });
      }
    } catch (error) {
      console.error('Error in walletFetshServer:', error.message);
      toast.error('Network or server error', { theme: 'dark' });
    }
  };

  const connectWallet = () => {
    if (walletAddress !== "no") {
      toast.warning('Wallet is already connected.', { theme: 'dark' });
      return;
    }
    tonConnectUI.connectWallet();
  };

  const disconnectWallet = () => {
    if (walletAddress === "no") {
      toast.warning('No wallet is connected.', { theme: 'dark' });
      return;
    }
    tonConnectUI.disconnect();
    setWalletAddress("no");
  };

  useEffect(() => {
    if (walletAddress !== "no") {
      console.log('Wallet address:', walletAddress);
      walletFetshServer(walletAddress, true);
    } else {
      console.log('No wallet connected');
      walletFetshServer(walletAddress, false);
    }
  }, [walletAddress]);

  return (
    <>
      {ton ? (
        <div className={cl.test}>
          {walletAddress === "no" ? (
            <button className={cl.ton} onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <button className={cl.unton} onClick={disconnectWallet}>
              Disconnect Wallet
            </button>
          )}
        </div>
      ) : (
        <div className={cl.test}>
          {walletAddress === "no" ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <button className={cl.button_wallet} onClick={disconnectWallet}>Disconnect Wallet</button>
          )}
        </div>
      )}
    </>
  );
};

export default ButtonWallet;
