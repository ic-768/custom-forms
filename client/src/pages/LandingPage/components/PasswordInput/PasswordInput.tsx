import { ChangeEvent, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import InputContainer from "../../../../components/inputs/InputContainer";

import "./PasswordInput.scss";

interface IPasswordInput {
  label: string;
  password: string;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  label,
  password,
  onChangePassword,
}: IPasswordInput) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainer
      label={label}
      component={
        <div className="password-input-container">
          <input
            className="password-input"
            value={password}
            onChange={onChangePassword}
            type={showPassword ? "text" : "password"}
          />
          <FontAwesomeIcon
            title="Show password"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            className="password-input-eye-icon"
            icon={faEye}
          />
        </div>
      }
    />
  );
};

export default PasswordInput;
