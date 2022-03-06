import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUser } from "./store/features/user/userSlice";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import { setToken } from "./services/forms";

const App = (): ReactElement => {
  const user = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      dispatch(setUser(userData));
      setToken(userData.token);
    }
  }, [dispatch]);

  return user ? <FormBuilder /> : <LandingPage />;
};
export default App;
