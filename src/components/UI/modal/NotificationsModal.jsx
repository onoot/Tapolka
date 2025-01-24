import React from "react";
import cl from "./NotificationsModal.module.css";

const notifications = [
  {
    id: 1,
    image: "https://via.placeholder.com/50",
    title: "ETH received",
    description: "Super wave collection",
    time: "1 day ago",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/50",
    title: "Eric follow your",
    description: "Ready to sell",
    time: "1 day ago",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/50",
    title: "Upload success",
    description: "1.05 ETH received",
    time: "1 day ago",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/50",
    title: "ETH received",
    description: "1.05 ETH received",
    time: "2 days ago",
  },
];

const NotificationsModal = () => {
  return (
    <div className={cl.dropdown_content}>
      <div className={cl.arrow_up} />
      {notifications.map((notification) => (
        <div key={notification.id} className={cl.notification_item}>
          <img
            src={notification.image}
            alt={notification.title}
            className={cl.notification_image}
          />
          <div className={cl.notification_content}>
            <h3 className={cl.notification_title}>{notification.title}</h3>
            <p className={cl.notification_description}>{notification.description}</p>
            <span className={cl.notification_time}>{notification.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsModal;
