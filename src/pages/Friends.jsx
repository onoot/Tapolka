import React, { useEffect, useState } from 'react';
import cl from "../styles/friends.module.css"
import InviteFriendsList from "../components/UI/InviteFriendsList/InviteFriendsList";
import FriendsList from "../components/UI/FriendsList/FriendsList";
import { usePlayerStore } from "../store/playerStore.mjs";
import { toast } from 'react-toastify';
import { useTelegram } from '../components/hooks/useTelegram'
import Button from "../components/UI/Button/Button";
import { useTranslation } from "../hooks/useTranslation";

const Friends = ({ url }) => {
    const { player } = usePlayerStore((state) => state);
    const [modal, setModal] = useState(false)
    const { shareMessage } = useTelegram();
    const [referralLink, setReferralLink] = useState('');
    
    const language = localStorage.getItem('language') || 'en';
    const { t } = useTranslation(language);

    const [inviteFriends, setInviteFriends] = useState([
        { 
            id: 1, 
            task: t('Friends.inviteFriends.0.task'), 
            reward: 1, 
            description: t('Friends.inviteFriends.0.description'), 
            pathImg: "redGift" 
        },
        { 
            id: 2, 
            task: t('Friends.inviteFriends.1.task'), 
            reward: 3, 
            description: t('Friends.inviteFriends.1.description'), 
            pathImg: "blueGift" 
        },
    ])

    const [friends, setFriends] = useState([])
    
    const closeModal = () => setModal(false);

    const openModal = (link) => {
        setReferralLink(link);
        setModal(true);
    };

    async function GetList() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error(!token);
                return;
            }
            const response = await fetch(`${url}/api/getFriendList/${player?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
            const data = await response.json();

            const friendList = Array.isArray(data?.friends) ? data.friends : [];
            setFriends(friendList);
        } catch (e) {
            console.error('Ошибка в GetList:', e.message);
            setFriends([]);
        }
    }

    useEffect(() => {
        GetList();
    }, []);

    return (
        <div className={`${cl.friends__container}`}>
            <div className={cl.friends__container__title}>
                {t('Friends.title')}
            </div>
            <div className={cl.friends__container__description}>
                {t('Friends.description')}
            </div>
            <InviteFriendsList inviteFriends={inviteFriends} url={url} openModal={openModal} />
            {modal && (
                <div className={cl.modal}>
                    <div className={cl.modalContent}>
                        <h3>{t('Friends.modal.title')}</h3>
                        <p>{t('Friends.modal.subtitle')}</p>
                        <div className={cl.referralLink}>{referralLink}</div>
                        <div className={cl.modalActions}>
                            <div className={cl.modalButtons}>
                                <Button 
                                    text={t('Friends.modal.buttons.share')}
                                    isImg={false}
                                    isFullScreen={false}
                                    onClick={() => {
                                        shareMessage(referralLink);
                                        closeModal();
                                    }}
                                />
                                <Button
                                    text={t('Friends.modal.buttons.close')}
                                    isImg={false}
                                    isFullScreen={false}
                                    onClick={closeModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <FriendsList friends={friends} GetList={GetList} />
        </div>
    );
};

export default Friends;