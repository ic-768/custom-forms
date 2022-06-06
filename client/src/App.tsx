import { ReactElement, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { selectUser, setUser } from "store/features/user/userSlice";
import {
  getIsLoading,
  getNotification,
} from "store/features/notifications/notificationsSlice";
import { setToken } from "services/forms";

import LandingPage from "pages/LandingPage";
import FormBuilder from "pages/FormBuilder";
import FormSubmission from "pages/FormSubmission";
import Loader from "components/Loader";
import Notification from "components/Notification";

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
      {/* Absolutely positioned global components */}
      {notification.message && <Notification notification={notification} />}
      {isLoading && <Loader />}

      <Routes>
        {/* Route for form submission - we allow unauthenticated submissions for now */}
        <Route path="submit/:user/:formId" element={<FormSubmission />} />

        {/* Route for users to build forms if they're logged in, or the homepage if they're not */}
        <Route path="*" element={user ? <FormBuilder /> : <LandingPage />} />
      </Routes>
    </>
  );
};

export default App;
