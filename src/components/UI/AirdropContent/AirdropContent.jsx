import React, { useState } from 'react';
import cl from './AirdropContent.module.css';
import BalanceCard from '../BalanceCard/BalanceCard';
import NFTCard from '../NFTCard/NFTCard';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import PaymentSuccessModal from "../modal/PaymentSuccessModal";
import { useTranslation } from '../../../hooks/useTranslation';

const AirdropContent = () => {
    const [activeSection, setActiveSection] = useState('token');
    const [isModalOpen, setIsModalOpen] = useState(true);
    
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);
    
    const handleClose = () => {
        setIsModalOpen(false);
    };

    const renderTokenContent = () => (
        <div className={cl.token_section}>
            <BalanceCard />
            <NFTCard />
            <TransactionHistory />
        </div>
    );

    const renderWithdrawContent = () => (
        <div className={cl.withdraw_section}>
            <div className={cl.withdraw_card}>
                <div className={cl.withdraw_info}>
                    <span className={cl.withdraw_label}>
                        {t('airdrop.withdraw.comingSoon')}
                    </span>
                    {isModalOpen && (
                        <PaymentSuccessModal paymentId="15263541" onClose={handleClose} />
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className={cl.airdrop_content}>
            <div className={cl.tabs}>
                <button 
                    className={`${cl.tab} ${activeSection === 'token' ? cl.active : ''}`}
                    onClick={() => setActiveSection('token')}
                >
                    {t('airdrop.tabs.token')}
                </button>
                <button 
                    className={`${cl.tab} ${activeSection === 'withdraw' ? cl.active : ''}`}
                    onClick={() => setActiveSection('withdraw')}
                >
                    {t('airdrop.tabs.withdraw')}
                </button>
            </div>
            
            {activeSection === 'token' ? renderTokenContent() : renderWithdrawContent()}
        </div>
    );
};

export default AirdropContent; 