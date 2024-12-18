import React, {useEffect, useState} from 'react';
import cl from "../styles/friends.module.css"
import InviteFriendsList from "../components/UI/InviteFriendsList/InviteFriendsList";
import FriendsList from "../components/UI/FriendsList/FriendsList";
import {usePlayerStore} from "../store/playerStore.mjs";

const Friends = ({url}) => {
    const { player } = usePlayerStore((state) => state);

    const [inviteFriends, setInviteFriends] = useState([
        {id: 1, task: "LootBox and key", reward: 1, description: "For you & your friend", pathImg:"redGift"},
        {id: 2, task: "LootBoxes and keys for Premium", reward: 3, description: "For you & your friend", pathImg:"blueGift"},
    ])


    const [friends, setFriends] = useState([
        // {id: 1, name: "Lara Croft", reward: 25300, level: 4},
    ])
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
                The opening of the LootBox will take place before TGE
            </div>
            <InviteFriendsList inviteFriends={inviteFriends} url={url}/>
            <FriendsList friends={friends} GetList={GetList}/>
        </div>

    );
};

export default Friends;