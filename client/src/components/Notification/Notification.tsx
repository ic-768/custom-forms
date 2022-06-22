import { ReactElement } from "react";
import { NotificationProps } from "store/features/notifications/notificationsSlice";

import "./Notification.scss";

const Notification = ({
  notification,
}: {
  notification: NotificationProps;
}): ReactElement => {
  const notificationClasses = `notification-body ${[notification.type]}`;

  return (
    <div className="notification-container">
      <span className={notificationClasses}>{notification.message}</span>
    </div>
  );
};

export default Notification;
