import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export type INotification = {
  message: string;
  type: "success" | "error";
};

export interface NotificationsState {
  isLoading: boolean;
  notification: INotification;
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

const getIsLoading = (state: RootState) => state.notifications.isLoading;
const getNotification = (state: RootState) => state.notifications.notification;

const { setIsLoading, setNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
export { getIsLoading, setIsLoading, getNotification, setNotification };
