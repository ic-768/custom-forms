import { INotification } from "../../store/features/notifications/notificationsSlice";
import classNames from "classnames";

import "./Notification.scss";

const Notification = ({ notification }: { notification: INotification }) => {
  const notificationClasses = classNames({
    "notification-body": true,
    [notification.type]: true,
  });

  return (
    <div className="notification-container">
      <span className={notificationClasses}>{notification.message}</span>
    </div>
  );
};

export default Notification;
