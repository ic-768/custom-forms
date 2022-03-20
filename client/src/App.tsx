import { ReactElement, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUser, setUser } from "./store/features/user/userSlice";
import {
  getIsLoading,
  getNotification,
} from "./store/features/notifications/notificationsSlice";
import { setToken } from "./services/forms";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import Loader from "./components/Loader/Loader";
import Notification from "./components/Notification/Notification";

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(getIsLoading);
  const notification = useAppSelector(getNotification);

  // if user is already set in local storage, log them in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData));
      setToken(userData.token);
    }
  }, [dispatch]);

  return (
    <>
      {notification.message && <Notification notification={notification} />}
      {isLoading && <Loader />}
      {user ? <FormBuilder /> : <LandingPage />}
    </>
  );
};
export default App;
