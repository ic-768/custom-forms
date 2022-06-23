import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NotificationProps } from "components/Notification/Notification";

import { RootState } from "store/store";

export interface NotificationsState {
  isLoading: boolean;
  notification: NotificationProps;
}

const initialState: NotificationsState = {
  isLoading: false,
  notification: { message: "", type: "success" },
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setIsLoading: (
      state,
      action: PayloadAction<NotificationsState["isLoading"]>
    ) => {
      state.isLoading = action.payload;
    },
    setNotification: (
      state,
      action: PayloadAction<NotificationsState["notification"]>
    ) => {
      state.notification = action.payload;
    },
  },
});

const getIsLoading = (state: RootState): boolean =>
  state.notifications.isLoading;
const getNotification = (state: RootState): NotificationProps =>
  state.notifications.notification;

const { setIsLoading, setNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
export { getIsLoading, setIsLoading, getNotification, setNotification };
