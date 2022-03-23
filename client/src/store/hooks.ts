import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";

import {
  setNotification,
  INotification,
  setIsLoading,
} from "./features/notifications/notificationsSlice";

// helper function to wait for a set duration
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

// hook that sets a notification and removes it after a set time
export const useNotification = () => {
  const dispatch = useDispatch();

  return async (notification: INotification, duration: number) => {
    dispatch(setNotification(notification));
    await sleep(duration);
    dispatch(setNotification({ type: "success", message: "" }));
  };
};

// hook that sets a loader and removes it after an action has taken place
export const useWithLoader = () => {
  const dispatch = useDispatch();

  return async (action: Function) => {
    dispatch(setIsLoading(true));
    await action();
    dispatch(setIsLoading(false));
  };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
