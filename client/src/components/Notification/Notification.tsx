import { notification } from "../../store/features/notifications/notificationsSlice";

import "./Notification.scss";

const Notification = ({ notification }: { notification: notification }) => (
  <div className="notification-container">{notification.message}</div>
);

export default Notification;
