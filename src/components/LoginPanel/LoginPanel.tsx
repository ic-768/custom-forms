import React from "react";

import { TextInput } from "../inputs/inputComponents";

import "./LoginPanel.scss";

const LoginPanel = () => (
  <div className="login-panel-container">
    <span className="login-panel-container-title">Log In</span>
    <TextInput label="Username" className="login-panel-container-input" />
    <TextInput label="Password" className="login-panel-container-input" />
  </div>
);

export default LoginPanel;
