import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setToken } from "../../services/forms";
import { login } from "../../services/login";
import { setUser } from "../../store/features/user/userSlice";
import { TextInput } from "../inputs/inputComponents";

import "./LoginPanel.scss";

const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async () => {
    const loginData = await login({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
    dispatch(setUser(loginData));
    setToken(loginData.token);
    navigate("/");
  };

  return (
    <div className="login-panel-container">
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
      <button onClick={onLogin}>Submit</button>
    </div>
  );
};

export default LoginPanel;
