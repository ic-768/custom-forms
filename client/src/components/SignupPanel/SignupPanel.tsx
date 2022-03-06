import { useState } from "react";
import axios from "axios";

import { TextInput } from "../inputs/inputComponents";

import "./SignupPanel.scss";

const SignupPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signup-panel-container">
      <span className="signup-panel-container-title">Sign Up</span>
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
      <button
        onClick={() => {
          axios.post("/add-user", { username, password });
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default SignupPanel;
