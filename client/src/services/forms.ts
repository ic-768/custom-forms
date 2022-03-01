import axios from "axios";

let token: string | null = null;
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

// TODO formData type
const postForm = async (formData: any, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

export { token, setToken, postForm };
