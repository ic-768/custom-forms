import axios from "axios";
import { ICustomInput } from "../components/inputs/resources";

let token: string | null = null;
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const postForm = async (formData: ICustomInput[], token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

export { token, setToken, postForm };
