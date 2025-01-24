import React from 'react';
import cl from './TransactionHistory.module.css';
import logoAvatar from '../../images/newLogoTOGO.svg';
import { useTranslation } from '../../../hooks/useTranslation';

const TransactionHistory = () => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    const transactions = [
        { 
            date: t('transactions.yesterday'), 
            items: [
                { icon: logoAvatar, type: t('transactions.deposit'), amount: '+ 50.00', currency: 'wTOGO' },
                { icon: logoAvatar, type: t('transactions.deposit'), amount: '+ 10.00', currency: 'wTOGO' },
            ]
        },
        { 
            date: '12 April 2025', 
            items: [
                { icon: logoAvatar, type: t('transactions.deposit'), amount: '+ 1 NFT', currency: 'NFT' },
                { icon: logoAvatar, type: t('transactions.deposit'), amount: '+ 100.00', currency: 'wTOGO' },
            ]
        }
    ];

    return (
        <div className={cl.transaction_history}>
            <div className={cl.header}>
                <h2 className={cl.title}>{t('transactions.title')}</h2>
                <a href="#" className={cl.view_all}>{t('transactions.viewAll')}</a>
            </div>
            {transactions.map((group, index) => (
                <div key={index} className={cl.transaction_group}>
                    <div className={cl.date}>{group.date}</div>
                    {group.items.map((item, idx) => (
                        <div key={idx} className={cl.transaction_item}>
                            <img src={item.icon} alt={`${item.type} Icon`} className={cl.transaction_icon} />
                            <div className={cl.transaction_info}>
                                <span className={cl.type}>{item.type}</span>
                                <span className={cl.currency}>+ {item.currency}</span>
                            </div>
                            <div className={cl.amount}>{item.amount}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TransactionHistory; 