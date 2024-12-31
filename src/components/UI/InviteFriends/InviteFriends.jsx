import React, { useState } from 'react';
import cl from "./InviteFriends.module.css";
import Button from "../Button/Button";
import { convertMoneyToRCommasIsFull } from "../../hooks/converMoney";
import { usePlayerStore } from "../../../store/playerStore.mjs";
import { toast } from 'react-toastify';

const InviteFriends = ({ item, url, openModal }) => {
    const { player } = usePlayerStore((state) => state);

    async function inviteFriend() {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Token not found. Please log in.', { theme: 'dark' });
            return;
        }
        try {
            const response = await fetch(`${url}/api/generateReferralLink/${player.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                toast.error(`Failed to generate link. Error code: ${response.status}`, { theme: 'dark' });
                return;
            }

            const data = await response.json();

            if (data.referralLink) {
                openModal(data.referralLink);
            } else {
                toast.error('Referral link not found in server response.', { theme: 'dark' });
            }
        } catch (e) {
            console.log(e);
            toast.error('An error occurred while generating the referral link.', { theme: 'dark' });
        }
    }

   

    return (
        <div className={cl.inviteFriend__container__item}>
            <div className={cl.inviteFriend__container__item__block}>
                <div className={cl.inviteFriend__container__item__block__video}>
                    <video
                        src={require(`../../images/${item.pathImg}.webm`)}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
                <div className={cl.inviteFriend__container__item__block__content}>
                    <div className={cl.inviteFriend__container__item__task}>
                        {item.task}
                    </div>
                    <div className={cl.inviteFriend__container__item__block__rewardText}>
                        <div className={cl.inviteFriend__container__item__block__svg}>
                            <img className={cl.inviteFriend__chest} src={require("../../images/key.png")} />
                        </div>
                        <div className={cl.inviteFriend__container__item__reward}>
                            +{convertMoneyToRCommasIsFull(item.reward)}
                        </div>
                        <div>
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>
            <div className={cl.inviteFriend__container__item__block}>
                <Button text={"Invite a friend"} isImg={false} isFullScreen={false} onClick={() => inviteFriend()} />
            </div>
        </div>
    );
};

export default InviteFriends;
