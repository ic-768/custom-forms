import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/login";
import { TextInput } from "../inputs/inputComponents";

import "./LoginPanel.scss";

const LoginPanel = ({ setUser }: { setUser: any }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async () => {
    const loginData = await login({ username, password });
    window.localStorage.setItem("loggedUser", JSON.stringify(loginData));
    navigate("/forms");
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
