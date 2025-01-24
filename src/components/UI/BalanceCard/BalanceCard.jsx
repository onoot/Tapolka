import React from 'react';
import cl from './BalanceCard.module.css';
import BalancOne from '../../images/balans_one.svg';
import BalancView from '../../images/balans_view.svg';

import { useTranslation } from '../../../hooks/useTranslation';

const BalanceCard = () => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.card}>
            <div className={cl.icon_wrapper}>
                <img src={BalancOne} alt="Balance Icon" className={cl.icon} />
            </div>
            <div className={cl.card_content}>
                <div className={cl.label}>
                    {t('balance.title')}
                </div>
                <div className={cl.amount}>
                    = 0.000 <span className={cl.highlight}>{t('balance.currency')}</span>
                </div>
            </div>
            <div className={cl.icon_wrapper}>
                <img src={BalancView} alt="View Icon" className={cl.icon} />
            </div>
        </div>
    );
};

export default BalanceCard; 