import axios from "axios";

const login = async (credentials: { username: string; password: string }) => {
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
