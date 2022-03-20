import { FormEvent, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useNotification, useWithLoader } from "../../store/hooks";
import TextInput from "../inputs/inputComponents/TextInput";

import "./SignupPanel.scss";

const SignupPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = useNotification();
  const withLoader = useWithLoader();

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();
    await withLoader(() => axios.post("/add-user", { username, password }));

    navigate("/login");
    notify(
      {
        type: "success",
        message: "Successfully signed up! You can log in now.",
      },
      5000
    );
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
