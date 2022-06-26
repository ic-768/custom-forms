import axios from "axios";

// Should be returned by server when logging in
type LoginData = { username: string; token: string };

export const isLoginData = (data: unknown): data is LoginData => {
  if (typeof data !== "object" || !data) return false;

  return "username" in data && "token" in data;
};

const login = async (credentials: {
  username: string;
  password: string;
}): Promise<unknown> => {
  try {
    const response = await axios.post("/login", credentials);

    return response.data;
  } catch {
    throw new Error(
      "Error logging in. Are you sure your credentials are correct?"
    );
  }
};

export { login };
