import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import formsReducer from "./features/forms/formsSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    forms: formsReducer,
    notifications: notificationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
