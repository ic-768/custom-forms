import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "./store";
import {
  setNotification,
  setIsLoading,
  INotification,
} from "./features/notifications/notificationsSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

// helper function to wait for a set duration
const sleep = (time: number): Promise<unknown> =>
  new Promise((resolve) => setTimeout(resolve, time));

// hook that sets a notification and removes it after a set time
export const useNotification = (): ((
  notification: INotification,
  duration: number
) => Promise<void>) => {
  const dispatch = useDispatch();

  return useCallback(
    async (notification: INotification, duration: number) => {
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
