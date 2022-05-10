import axios from "axios";

import { IForm } from "../pages/FormBuilder/resources/shared";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

const asyncGetForm = async (username: string, formId: string) => {
  try {
    const config = { headers: { username, formId } };
    const response = await axios.get("/forms/form-to-submit", config);
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error("Error fetching forms " + e);
  }
};

const asyncGetForms = async (token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.get("/forms", config);
    return response.data;
  } catch (e) {
    console.log(e);
    throw new Error("Error fetching forms " + e);
  }
};

const asyncPostForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    throw new Error("Error posting form: " + e);
  }
};

const asyncUpdateForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.put("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    throw new Error("Error updating form: " + e);
  }
};

const asyncDeleteForm = async (formId: IForm["_id"], token: string) => {
  try {
    const config = { headers: { Authorization: token }, data: { formId } };
    const response = await axios.delete("/forms", config);
    return response.data;
  } catch (e) {
    throw new Error("Error deleting form: " + e);
  }
};

const asyncDeleteMultipleForms = async (
  formIds: IForm["_id"][],
  token: string
) => {
  try {
    const config = { headers: { Authorization: token }, data: { formIds } };
    const response = await axios.delete("/forms/multiple", config);
    return response.data;
  } catch (e) {
    throw new Error("Error deleting form: " + e);
  }
};

const asyncSubmitForm = async (submissions: any[]) => {
  try {
    const response = await axios.post("/forms/form-to-submit", { submissions });
    return response.data;
  } catch (e) {
    throw new Error("Error submitting form: " + e);
  }
};

export {
  token,
  setToken,
  asyncGetForm,
  asyncGetForms,
  asyncPostForm,
  asyncUpdateForm,
  asyncDeleteForm,
  asyncDeleteMultipleForms,
  asyncSubmitForm,
};
