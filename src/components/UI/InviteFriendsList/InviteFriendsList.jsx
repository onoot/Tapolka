import React from 'react';
import cl from "./InviteFriendsList.module.css"
import InviteFriends from "../InviteFriends/InviteFriends";

const InviteFriendsList = ({inviteFriends, url}) => {
    return (
        <div className={cl.inviteFriendsList__container}>
            {
                inviteFriends.map((item) => {
                    return <InviteFriends key={item.id} item={item} url={url}/>
                })
            }
            <button className={cl.inviteFriendsList__moreBonuses}>More bonuses</button>
        </div>
    );
};

export default InviteFriendsList;