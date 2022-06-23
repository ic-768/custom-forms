import { FormEvent, ReactElement } from "react";

import { useWithLoader } from "store/hooks";
import BackButton from "components/BackButton";
import { TextInput } from "components/inputs/inputComponents";
import PasswordInput from "../../components/PasswordInput";
import useSignup from "../../hooks/useSignup";
import useCredentials from "../../hooks/useCredentials";

import "./SignupPanel.scss";

const SignupPanel = (): ReactElement => {
  const { username, password, changeUsername, changePassword } =
    useCredentials();

  const withLoader = useWithLoader();
  const signup = useSignup();

  const onSignup = (e: FormEvent): void => {
    e.preventDefault();
    withLoader(async () => {
      await signup(username, password);
    });
  };

  return (
    <form className="signup-panel-container" onSubmit={onSignup}>
      <BackButton className="signup-panel-back-arrow" />
      <span className="signup-panel-container-title">Sign Up</span>
      <TextInput
        autoFocus
        title="Username"
        value={username}
        onChange={changeUsername}
      />
      <PasswordInput
        title="Password"
        password={password}
        onChangePassword={changePassword}
      />
      <button type="submit" className="signup-panel-signup-button">
        Submit
      </button>
    </form>
  );
};

export default SignupPanel;
