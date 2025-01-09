import React, { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import cl from './ButtonWallet.module.css';
import { toast } from 'react-toastify';
import { usePlayerStore } from '../../../store/playerStore.mjs';

const ButtonWallet = ({ ton, connect }) => {
  const [walletAddress, setWalletAddress] = useState("no");
  const [isConnecting, setIsConnecting] = useState(false);
  const [tonConnectUI] = useTonConnectUI();
  const { player } = usePlayerStore();

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
  }, [tonConnectUI]);

  const walletFetshServer = async (pubkey, option) => {
    // Ваш код для запроса walletFetshServer
  };

  const connectWallet = async () => {
    if (isConnecting || walletAddress !== "no") {
      toast.warning('Wallet is already connected or connection in progress.', { theme: 'dark' });
      return;
    }

    try {
      setIsConnecting(true);
      await tonConnectUI.connectWallet();
    } catch (error) {
      console.error('Error connecting wallet:', error.message);
      toast.error('Error connecting wallet.', { theme: 'dark' });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    if (isConnecting || walletAddress === "no") {
      toast.warning('No wallet is connected or disconnection in progress.', { theme: 'dark' });
      return;
    }

    try {
      setIsConnecting(true);
      await tonConnectUI.disconnect();
      setWalletAddress("no");
      toast.info('Wallet disconnected successfully', { theme: 'dark' });
    } catch (error) {
      console.error('Error disconnecting wallet:', error.message);
      toast.error(`Error disconnecting wallet: ${error.message}`, { theme: 'dark' });
    } finally {
      setIsConnecting(false);
    }
  };

  const reconnectWallet = async () => {
    if (isConnecting) {
      toast.warning('Wallet reconnection in progress.', { theme: 'dark' });
      return;
    }

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
    if (walletAddress !== "no") {
      walletFetshServer(walletAddress, true);
    } else {
      walletFetshServer(walletAddress, false);
    }
  }, [walletAddress]);

  return (
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
  );
};

export default ButtonWallet;
