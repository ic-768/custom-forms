import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../services/forms";
import { login } from "../../services/login";
import { setUser } from "../../store/features/user/userSlice";
import TextInput from "../inputs/inputComponents/TextInput";

import "./LoginPanel.scss";

const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    const loginData = await login({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
    dispatch(setUser(loginData));
    setToken(loginData.token);
    navigate("/");
  };

  return (
    <form className="login-panel-container" onSubmit={onLogin}>
      <span className="login-panel-container-title">Log In</span>
      <TextInput
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="login-panel-login-button">
        Submit
      </button>
    </form>
  );
};

export default LoginPanel;
