import React, { useState } from 'react';
import cl from './AirdropHeader.module.css';
import call from '../../images/call.svg';
import viewIcon from '../../images/view.svg';
import { useTranslation } from '../../../hooks/useTranslation';
import { toast } from 'react-toastify';
import NotificationsModal from '../modal/NotificationsModal.jsx';

const AirdropHeader = ({ walletAddress }) => {
  const language = localStorage.getItem('language') || 'en';
  const { t } = useTranslation(language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Управление выпадающим меню


  // Функция для сокращения адреса
  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Функция для просмотра адреса в TON Explorer
  const viewInExplorer = () => {
    window.open(`https://tonscan.org/address/${walletAddress}`, '_blank');
  };

  // Переключение выпадающего меню
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className={cl.header}>
      <button className={cl.disconnect_button}>
        {t('Airdrop.header.disconnect')}
      </button>
      <div className={cl.wallet_info}>
  <span className={cl.address}>{shortenAddress(walletAddress)}</span>
  <div className={cl.icon_container} style={{ position: "relative" }}>
    <img
      className={cl.icon}
      src={call}
      alt={t("Airdrop.header.buttons.copy")}
      onClick={toggleDropdown}
      title={t("Airdrop.header.buttons.copy")}
    />
    {isDropdownOpen && (
      <NotificationsModal />
    )}
  </div>
  <img
    className={cl.icon}
    src={viewIcon}
    onClick={viewInExplorer}
    title={t("Airdrop.header.buttons.view")}
  />
</div>

    </div>
  );
};

export default AirdropHeader;