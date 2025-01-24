import React from "react";
import cl from "./PaymentSuccessModal.module.css";
import { useTranslation } from '../../../hooks/useTranslation';

const PaymentSuccessModal = ({ paymentId, onClose }) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.modal_overlay}>
            <div className={cl.modal_content}>
                <button onClick={onClose} className={cl.close_button}>✕</button>
                <h2 className={cl.title}>{t('modal.paymentSuccess')}</h2>
                <div className={cl.emoji_container}>
                    <span className={cl.emoji}>✨</span>
                </div>
                <p className={cl.message}>{t('modal.successMessage')}</p>
                <p className={cl.payment_id}>
                    {t('modal.paymentId')} <span className={cl.payment_id_value}>{paymentId}</span>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;
