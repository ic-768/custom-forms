import { FormEvent, ReactElement } from "react";

import BackButton from "components/BackButton";
import { TextInput } from "components/inputs/inputComponents";
import { useWithLoader } from "store/hooks";
import PasswordInput from "../../components/PasswordInput";
import useCredentials from "../../hooks/useCredentials";

import "./CredentialsPanel.scss";

const CredentialsPanel = ({
  action,
}: {
  action: (username: string, password: string) => Promise<void>;
}): ReactElement => {
  const { username, password, changeUsername, changePassword } =
    useCredentials();

  const withLoader = useWithLoader();

  const onSubmit = (e: FormEvent): void => {
    e.preventDefault();

    withLoader(async () => {
      await action(username, password);
    });
  };

  return (
    <form className="credentials-panel-container" onSubmit={onSubmit}>
      <BackButton className="credentials-panel-back-arrow" />
      <span className="credentials-panel-container-title">Log In</span>
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
      <button type="submit" className="credentials-panel-login-button">
        Submit
      </button>
    </form>
  );
};

export default CredentialsPanel;
