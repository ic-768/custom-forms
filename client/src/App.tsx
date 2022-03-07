import { ReactElement, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./store/hooks";
import { selectUser, setUser } from "./store/features/user/userSlice";
import { setToken } from "./services/forms";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

const App = (): ReactElement => {
  const user = useAppSelector(selectUser);
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
