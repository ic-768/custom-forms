import React, { useState } from "react";
import axios from "axios";

import { TextInput } from "../inputs/inputComponents";

import "./LoginPanel.scss";

const LoginPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-panel-container">
      <span className="login-panel-container-title">Log In</span>
      <TextInput
        label="Username"
        className="login-panel-container-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextInput
        label="Password"
        className="login-panel-container-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => {
          axios.post("/", { username, password });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default LoginPanel;
