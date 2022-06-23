import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useNotification } from "store/hooks";
import { isLoginData, login } from "services/login";
import { setUser } from "store/features/user/userSlice";
import { setToken } from "services/forms";

const useLogin = (): ((
  username: string,
  password: string
) => Promise<void>) => {
  const navigate = useNavigate();
  const notify = useNotification();
  const dispatch = useDispatch();

  return async (username: string, password: string) => {
    try {
      const loginData = await login({ username, password });
      if (isLoginData(loginData)) {
        window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
        dispatch(setUser(loginData));
        setToken(loginData.token);
        navigate("/");
        notify({ type: "success", message: "Welcome!" }, 5000);
      } else {
        notify(
          { type: "error", message: "There was an error during login" },
          5000
        );
      }
    } catch (e) {
      if (e instanceof Error) {
        notify({ type: "error", message: e.message }, 5000);
      }
    }
  };
};

export default useLogin;
