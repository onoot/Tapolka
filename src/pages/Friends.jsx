import React, {useEffect, useState} from 'react';
import cl from "../styles/friends.module.css"
import InviteFriendsList from "../components/UI/InviteFriendsList/InviteFriendsList";
import FriendsList from "../components/UI/FriendsList/FriendsList";
import {useTelegram} from "../components/hooks/useTelegram";

const Friends = ({url}) => {
    const [inviteFriends, setInviteFriends] = useState([
        {id: 1, task: "Invite a friend", reward: 5000, description: "For you & your friend", pathImg:"redGift"},
        {id: 2, task: "Invite a friend with Telegram", reward: 25000, description: "For you & your friend", pathImg:"blueGift"},
    ])
    const {initData} = useTelegram();


    const [friends, setFriends] = useState([
        // {id: 1, name: "Lara Croft", reward: 25300, level: 4},
    ])
    async function GetList() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Токен отсутствует');
                return;
            }
            const response = await fetch(`${url}/api/getFriendList/${initData?.user?.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Ошибка запроса: ${response.status}`);
            }
            const data = await response.json();
            
            // Защита от некорректного ответа сервера
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
                Invite friends!
            </div>
            <div className={cl.friends__container__description}>
                You and your friend will receive bonuses
            </div>
            <InviteFriendsList inviteFriends={inviteFriends} url={url}/>
            <FriendsList friends={friends} GetList={GetList}/>
        </div>

    );
};

export default Friends;