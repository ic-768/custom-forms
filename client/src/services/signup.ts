import axios from "axios";

const signup = async (credentials: {
  username: string;
  password: string;
}): Promise<void> => {
  try {
    await axios.post("/add-user", credentials);
  } catch {
    // TODO either no internet connection or user with same username exists
    throw new Error("Something went wrong. Try using a different username");
  }
};

export { signup };
