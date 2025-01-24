import React from 'react';
import cl from "./DeleteAccount.module.css"
import Button from "../Button/Button";
import { useTranslation } from '../../../hooks/useTranslation';

const DeleteAccount = ({deleteAccount, setDeleteAccount}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    const rootClasses = [cl.deleteAccount__background]
    if(deleteAccount){
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(" ")}>
            <div className={cl.deleteAccount__container}>
                <div className={cl.deleteAccount__container__title}>
                    {t('DeleteAccount.title')}
                </div>
                <div className={cl.deleteAccount__container__description}>
                    {t('DeleteAccount.description')}
                </div>
                <Button text={t('DeleteAccount.buttons.delete')} isImg={false} isFullScreen={true}/>
                <button onClick={() => setDeleteAccount(false)} className={cl.deleteAccount__container__button}>
                    {t('DeleteAccount.buttons.cancel')}
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;