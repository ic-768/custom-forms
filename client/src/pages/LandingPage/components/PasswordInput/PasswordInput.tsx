import { ChangeEventHandler, ReactElement, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputContainer from "components/inputs/InputContainer";

import "./PasswordInput.scss";

interface PasswordInputProps {
  title: string;
  password: string;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
}

const PasswordInput = ({
  title,
  password,
  onChangePassword,
}: PasswordInputProps): ReactElement => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hidePassword = (): void => setIsPasswordVisible(false);
  const revealPassword = (): void => setIsPasswordVisible(true);

  return (
    <InputContainer
      title={title}
      component={
        <div className="password-input-container">
          <input
            className="password-input"
            value={password}
            onChange={onChangePassword}
            type={isPasswordVisible ? "text" : "password"}
          />
          <FontAwesomeIcon
            title="Show password"
            onMouseDown={revealPassword}
            onMouseUp={hidePassword}
            onMouseLeave={hidePassword}
            className="password-input-eye-icon"
            icon={faEye}
          />
        </div>
      }
    />
  );
};

export default PasswordInput;
