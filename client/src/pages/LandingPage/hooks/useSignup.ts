import { useNavigate } from "react-router-dom";
import { useNotification } from "store/hooks";
import { signup } from "services/signup";

const useSignup = (): ((
  username: string,
  password: string
) => Promise<void>) => {
  const navigate = useNavigate();
  const notify = useNotification();

  return async (username: string, password: string) => {
    try {
      await signup({ username, password });
      navigate("/login");
      notify(
        {
          type: "success",
          message: "Successfully signed up! You can log in now.",
        },
        5000
      );
    } catch (e) {
      if (e instanceof Error) {
        notify({ type: "error", message: e.message }, 5000);
      }
    }
  };
};

export default useSignup;
