import React from 'react';
import cl from './NFTCard.module.css';
import { useTranslation } from '../../../hooks/useTranslation';

const NFTCard = () => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.card}>
            <div className={cl.icon_wrapper}>
                <img src={require('../../images/myNFT.png')} alt="NFT Icon" className={cl.icon} />
            </div>
            <div className={cl.card_content}>
                <div className={cl.label}>
                    {t('nft.title')}
                </div>
                <div className={cl.amount}>
                    = 0.0 <span className={cl.highlight_blue}>{t('nft.collection')}</span>
                </div>
            </div>
        </div>
    );
};

export default NFTCard; 