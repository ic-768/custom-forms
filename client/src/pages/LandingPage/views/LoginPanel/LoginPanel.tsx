import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { setToken } from "../../../../services/forms";
import { login } from "../../../../services/login";
import { setUser } from "../../../../store/features/user/userSlice";
import { useNotification, useWithLoader } from "../../../../store/hooks";
import { TextInput } from "../../../../components/inputs/inputComponents";
import PasswordInput from "../../components/PasswordInput";

import "./LoginPanel.scss";

const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notify = useNotification();
  const withLoader = useWithLoader();

  const onLogin = (e: FormEvent) => {
    e.preventDefault();

    withLoader(async () => {
      try {
        const loginData = await login({ username, password });
        window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
        dispatch(setUser(loginData));
        setToken(loginData.token);
        navigate("/");
        notify({ type: "success", message: "Welcome!" }, 5000);
      } catch (e) {
        if (e instanceof Error) {
          notify({ type: "error", message: e.message }, 5000);
        }
      }
    });
  };

  return (
    <form className="login-panel-container" onSubmit={onLogin}>
      <Link className="login-panel-back-arrow" to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <span className="login-panel-container-title">Log In</span>
      <TextInput
        autoFocus
        title="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <PasswordInput
        title="Password"
        password={password}
        onChangePassword={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="login-panel-login-button">
        Submit
      </button>
    </form>
  );
};

export default LoginPanel;
