import { ChangeEventHandler, useState } from "react";

const useCredentials = (): {
  username: string;
  password: string;
  changeUsername: ChangeEventHandler<HTMLInputElement>;
  changePassword: ChangeEventHandler<HTMLInputElement>;
} => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (e): void =>
    setUsername(e.target.value);

  const changePassword: ChangeEventHandler<HTMLInputElement> = (e): void =>
    setPassword(e.target.value);

  return { username, changeUsername, password, changePassword };
};

export default useCredentials;
