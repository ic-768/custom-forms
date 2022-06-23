import { FormEvent, ReactElement } from "react";

import BackButton from "components/BackButton";
import { TextInput } from "components/inputs/inputComponents";
import { useWithLoader } from "store/hooks";
import PasswordInput from "../../components/PasswordInput";
import useLogin from "../../hooks/useLogin";
import useCredentials from "../../hooks/useCredentials";

import "./LoginPanel.scss";

const LoginPanel = (): ReactElement => {
  const { username, password, changeUsername, changePassword } =
    useCredentials();
  const withLoader = useWithLoader();
  const login = useLogin();

  const onLogin = (e: FormEvent): void => {
    e.preventDefault();

    withLoader(async () => {
      await login(username, password);
    });
  };

  return (
    <form className="login-panel-container" onSubmit={onLogin}>
      <BackButton className="login-panel-back-arrow" />
      <span className="login-panel-container-title">Log In</span>
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
      <button type="submit" className="login-panel-login-button">
        Submit
      </button>
    </form>
  );
};

export default LoginPanel;
