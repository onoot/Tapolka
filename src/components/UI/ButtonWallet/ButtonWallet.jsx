import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';
import { toast } from 'react-toastify';
import { usePlayerStore } from '../../../store/playerStore.mjs';
import { useTranslation } from '../../../hooks/useTranslation';

const ButtonWallet = ({ ton }) => {
  const language = localStorage.getItem('language') || 'en';
  const { t } = useTranslation(language);
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
      console.error(t('Wallet.messages.errors.tokenNotFound'));
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
        toast.error(t('Wallet.messages.errors.status', { code: response.status }), { theme: 'dark' });
        return;
      }

      if (response.status === 200 && pubkey !== "no") {
        const data = await response.json();
        console.log(data);
        toast.info(t('Wallet.messages.connectSuccess'), { theme: 'dark' });
      }
    } catch (error) {
      console.error('Error in walletFetshServer:', error.message);
      toast.error(t('Wallet.messages.errors.network'), { theme: 'dark' });
    }
  };

  const connectWallet = async () => {
    try {
      if (walletAddress !== "no") {
        toast.info(t('Wallet.messages.alreadyConnected'), { theme: "dark" });
        return;
      }

      await tonConnectUI.connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
      toast.error(t('Wallet.messages.errors.connect'), { theme: 'dark' });
    }
  };

  const disconnectWallet = async () => {
    try {
      if (walletAddress === "no") {
        toast.info(t('Wallet.messages.noWalletConnected'), { theme: "dark" });
        return;
      }

      await tonConnectUI.disconnect();
      setWalletAddress("no");
      toast.info(t('Wallet.messages.disconnectSuccess'), { theme: 'dark' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error.message);
      toast.error(t('Wallet.messages.errors.disconnect', { error: error.message }), { theme: 'dark' });
    }
  };

  return (
    <>
      {ton ? (
        <div className={cl.test}>
          {walletAddress === "no" ? (
            <button className={cl.ton} onClick={connectWallet}>
              {t('Wallet.connect')}
            </button>
          ) : (
            <button className={cl.unton} onClick={disconnectWallet}>
              {t('Wallet.disconnect')}
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
