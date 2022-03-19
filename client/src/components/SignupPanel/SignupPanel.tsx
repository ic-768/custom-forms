import { FormEvent, useState } from "react";
import axios from "axios";

import TextInput from "../inputs/inputComponents/TextInput";

import "./SignupPanel.scss";
import { useNavigate } from "react-router-dom";

const SignupPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignup = (e: FormEvent) => {
    e.preventDefault();
    axios.post("/add-user", { username, password });
    navigate("/login");
  };

  return (
    <form className="signup-panel-container" onSubmit={onSignup}>
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
      <button type="submit" className="signup-panel-signup-button">
        Submit
      </button>
    </form>
  );
};

export default SignupPanel;
