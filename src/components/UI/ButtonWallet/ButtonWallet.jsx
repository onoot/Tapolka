import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';
import { toast } from 'react-toastify';
import { usePlayerStore } from '../../../store/playerStore.mjs';

const ButtonWallet = ({ ton, connect }) => {
  const [walletAddress, setWalletAddress] = useState("no");
  const [tonConnectUI] = useTonConnectUI();
  const { player } = usePlayerStore();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        console.log('Wallet connected:', wallet.account.address);
        setWalletAddress(wallet.account.address);
      } else {
        console.log('Wallet disconnected');
        setWalletAddress("no");
      }
    });
  
    return () => unsubscribe();
  }, [tonConnectUI, player]); 
  
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
  const connectWallet = async () => {
    try {
      setIsConnecting(true); // Устанавливаем флаг подключения
      await tonConnectUI.connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
      toast.error('Error connecting wallet.', { theme: 'dark' });
    } finally {
      setIsConnecting(false); // Сбрасываем флаг
    }
  };
  
  const disconnectWallet = async () => {
  
    try {
      setIsConnecting(true); // Устанавливаем флаг отключения
      await tonConnectUI.disconnect();
      setWalletAddress("no");
      toast.info('Wallet disconnected successfully', { theme: 'dark' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error.message);
      toast.error(`Error disconnecting wallet: ${error.message}`, { theme: 'dark' });
    } finally {
      setIsConnecting(false); // Сбрасываем флаг
    }
  };
  
  const reconnectWallet = async () => {
    try {
      setIsConnecting(true);
      if (walletAddress !== "no") {
        await tonConnectUI.disconnect();
        setWalletAddress("no");
      }
      await tonConnectUI.connectWallet();
    } catch (error) {
      console.error('Error reconnecting wallet:', error.message);
      toast.error('Error reconnecting wallet.', { theme: 'dark' });
    } finally {
      setIsConnecting(false);
    }
  };
  

  useEffect(() => {
    if (walletAddress != "no") {
      console.log('Wallet address:', walletAddress);
      walletFetshServer(walletAddress, true);
    } else {
      console.log('No wallet connected');
      walletFetshServer(walletAddress, false);
      disconnectWallet();
    }
  }, [walletAddress]);

  return (
    <>
      {ton ? (
        <div className={cl.test}>
          {walletAddress === "no" ? (
            <button className={cl.ton} onClick={reconnectWallet}>
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
            <button className={cl.button_wallet} onClick={reconnectWallet}></button>
          ) : (
            <button className={cl.button_wallet} onClick={disconnectWallet}></button>
          )}
        </div>
      )}
    </>
  );
};

export default ButtonWallet;
