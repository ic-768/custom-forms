import { FormEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useNotification, useWithLoader } from "../../../../store/hooks";
import PasswordInput from "../../components/PasswordInput";
import { TextInput } from "../../../../components/inputs/inputComponents";
import { signup } from "../../../../services/signup";

import "./SignupPanel.scss";

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
      <Link className="signup-panel-back-arrow" to="/">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <span className="signup-panel-container-title">Sign Up</span>
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
      <button type="submit" className="signup-panel-signup-button">
        Submit
      </button>
    </form>
  );
};

export default SignupPanel;
