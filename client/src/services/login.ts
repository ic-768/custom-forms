import axios from "axios";

const login = async (credentials: { username: string; password: string }) => {
  try {
    const response = await axios.post("/login", credentials);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

export { login };
