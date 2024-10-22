import React, {useState} from 'react';
import cl from "../styles/friends.module.css"
import InviteFriendsList from "../components/UI/InviteFriendsList/InviteFriendsList";
import FriendsList from "../components/UI/FriendsList/FriendsList";

const Friends = () => {
    const [inviteFriends, setInviteFriends] = useState([
        {id: 1, task: "Invite a friend", reward: 5000, description: "For you & your friend", pathImg:"redGift"},
        {id: 2, task: "Invite a friend with Telegram", reward: 25000, description: "For you & your friend", pathImg:"blueGift"},
    ])
    const [friends, setFriends] = useState([
        {id: 1, name: "Lara Croft", reward: 25300, level: 4},
        {id: 2, name: "Lara Croft2", reward: 20300, level: 6},
        {id: 3, name: "Lara Croft", reward: 25300, level: 4},
        {id: 4, name: "Lara Croft2", reward: 20300, level: 6},
        {id: 5, name: "Lara Croft", reward: 25300, level: 4},
        {id: 6, name: "Lara Croft2", reward: 20300, level: 6},
    ])


    return (
        <div className={cl.friends__container}>
            <div className={cl.friends__container__title}>
                Invite friends!
            </div>
            <div className={cl.friends__container__description}>
                You and your friend will receive bonuses
            </div>
            <InviteFriendsList inviteFriends={inviteFriends}/>
            <FriendsList friends={friends}/>
        </div>

    );
};

export default Friends;