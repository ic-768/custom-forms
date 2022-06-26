import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { RootState, AppDispatch } from "./store";
import {
  setNotification,
  setIsLoading,
} from "./features/notifications/notificationsSlice";
import { NotificationProps } from "components/Notification/Notification";

// Used to clear previous notifications if they're still active while a new one is triggered
let sleepId: number | null = null;

// helper function to wait for a set duration
const sleep = (time: number): Promise<unknown> => {
  if (sleepId) clearTimeout(sleepId);

  return new Promise((resolve) => {
    sleepId = setTimeout(resolve, time);
  });
};

// hook that sets a notification and removes it after a set time
export const useNotification = (): ((
  notification: NotificationProps,
  duration: number
) => Promise<void>) => {
  const dispatch = useDispatch();

  return useCallback(
    async (notification, duration) => {
      dispatch(setNotification(notification));
      await sleep(duration);
      dispatch(setNotification({ type: "success", message: "" }));
    },
    [dispatch]
  );
};

// hook that sets a loader and removes it after an action has taken place
export const useWithLoader = (): ((
  action: () => Promise<void>
) => Promise<void>) => {
  const dispatch = useDispatch();

  return useCallback(
    async (action: () => Promise<void>) => {
      dispatch(setIsLoading(true));
      await action();
      dispatch(setIsLoading(false));
    },
    [dispatch]
  );
};

export const useAppDispatch = (): ThunkDispatch<
  RootState,
  undefined,
  AnyAction
> => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
