import { ReactElement } from "react";
import "./Notification.scss";

export type NotificationProps = {
  message: string;
  type: "success" | "error";
};

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
