import React from 'react';
import cl from "./InviteFriendsList.module.css"
import InviteFriends from "../InviteFriends/InviteFriends";
import { useTranslation } from "../../../hooks/useTranslation";

const InviteFriendsList = ({inviteFriends, url, openModal}) => {
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    return (
        <div className={cl.inviteFriendsList__container}>
            {
                inviteFriends.map((item) => {
                    return <InviteFriends key={item.id} item={item} url={url} openModal={openModal}/>
                })
            }
            <button className={cl.inviteFriendsList__moreBonuses}>
                {t('InviteFriendsList.moreBonuses')}
            </button>
        </div>
    );
};

export default InviteFriendsList;