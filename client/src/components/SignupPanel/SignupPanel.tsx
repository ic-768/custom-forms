import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useNotification, useWithLoader } from "../../store/hooks";
import TextInput from "../inputs/inputComponents/TextInput";

import "./SignupPanel.scss";
import { signup } from "../../services/signup";

const SignupPanel = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const notify = useNotification();
  const withLoader = useWithLoader();

  const onSignup = (e: FormEvent) => {
    e.preventDefault();
    withLoader(async () => {
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
    });
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
