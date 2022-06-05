import { INotification } from "store/features/notifications/notificationsSlice";

import "./Notification.scss";

const Notification = ({ notification }: { notification: INotification }) => {
  const notificationClasses = `notification-body ${[notification.type]}`;

  return (
    <div className="notification-container">
      <span className={notificationClasses}>{notification.message}</span>
    </div>
  );
};

export default Notification;
