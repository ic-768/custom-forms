import axios from "axios";
import IForm from "../resources/IForm";

let token: string | null = null;
const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const getForms = async (token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.get("/forms", config);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

const postForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

const updateForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.put("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    console.log("error logging in: " + e);
  }
};

export { token, setToken, getForms, postForm, updateForm };
