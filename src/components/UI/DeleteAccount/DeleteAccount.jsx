import React, {useState} from 'react';
import cl from "./DeleteAccount.module.css"
import Button from "../Button/Button";

const DeleteAccount = ({deleteAccount, setDeleteAccount}) => {

    const rootClasses = [cl.deleteAccount__background]
    if(deleteAccount){
        rootClasses.push(cl.active)
    }
    return (
        <div className={rootClasses.join(" ")}>
            <div className={cl.deleteAccount__container}>
                <div className={cl.deleteAccount__container__title}>
                    Are you sure you want to delete your account?
                </div>
                <div className={cl.deleteAccount__container__description}>
                    All your data, including game progress, achievements, and purchases, will be permanently deleted.
                </div>
                <Button text={"Delete account"} isImg={false} isFullScreen={true}/>
                <button onClick={() => setDeleteAccount(false)} className={cl.deleteAccount__container__button}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;