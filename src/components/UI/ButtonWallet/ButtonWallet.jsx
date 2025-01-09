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
    // Проверяем текущий адрес кошелька при загрузке компонента
    const initWallet = async () => {
      const wallet = tonConnectUI.wallet;
      if (wallet) {
        console.log('Wallet already connected:', wallet.account.address);
        setWalletAddress(wallet.account.address);
        walletFetshServer(wallet.account.address, true); // Отправка на сервер
      } else {
        console.log('No wallet connected');
      }
    };

    initWallet();
  }, [tonConnectUI]);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        console.log('Wallet connected:', wallet.account.address);
        setWalletAddress(wallet.account.address);
        walletFetshServer(wallet.account.address, true); // Автоотправка на сервер
      } else {
        console.log('Wallet disconnected');
        setWalletAddress("no");
        walletFetshServer("no", false); // Автоотправка на сервер
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
        toast.error(`Error code ${response.status}`, { theme: 'dark' });
        return;
      }

      if (response.status === 200 && pubkey !== "no") {
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
      if (walletAddress !== "no") {
        toast.info("Wallet is already connected.", { theme: "dark" });
        return;
      }

      await tonConnectUI.connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
      toast.error('Error connecting wallet.', { theme: 'dark' });
    }
  };

  const disconnectWallet = async () => {
    try {
      if (walletAddress === "no") {
        toast.info("No wallet connected.", { theme: "dark" });
        return;
      }

      await tonConnectUI.disconnect();
      setWalletAddress("no");
      toast.info('Wallet disconnected successfully', { theme: 'dark' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error.message);
      toast.error(`Error disconnecting wallet: ${error.message}`, { theme: 'dark' });
    }
  };

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
            <button className={cl.button_wallet} onClick={connectWallet}></button>
          ) : (
            <button className={cl.button_wallet} onClick={disconnectWallet}></button>
          )}
        </div>
      )}
    </>
  );
};

export default ButtonWallet;
