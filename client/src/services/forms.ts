import axios from "axios";
import { IForm, IFormSubmission } from "../resources/shared";

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
};

/**
 * Get a user form
 */
const asyncGetForm = async (username: string, formId: IForm["_id"]) => {
  if (formId) {
    try {
      const config = { headers: { username, formId } };
      const response = await axios.get("/forms/form-to-submit", config);
      return response.data;
    } catch (e) {
      throw new Error("Error fetching forms " + e);
    }
  }
};

/**
 * Get all of signed-in user's forms
 */
const asyncGetForms = async (token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.get("/forms", config);
    return response.data;
  } catch (e) {
    throw new Error("Error fetching forms " + e);
  }
};

/**
 * Create a new form
 */
const asyncPostForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.post("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    throw new Error("Error posting form: " + e);
  }
};

/**
 * Update a form
 */
const asyncUpdateForm = async (formData: IForm, token: string) => {
  try {
    const config = { headers: { Authorization: token } };
    const response = await axios.put("/forms", { formData }, config);
    return response.data;
  } catch (e) {
    throw new Error("Error updating form: " + e);
  }
};

/**
 * Delete a form
 */
const asyncDeleteForm = async (formId: IForm["_id"], token: string) => {
  try {
    const config = { headers: { Authorization: token }, data: { formId } };
    const response = await axios.delete("/forms", config);
    return response.data;
  } catch (e) {
    throw new Error("Error deleting form: " + e);
  }
};

/**
 * Batch - delete forms
 */
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

/**
 * Submit a filled-out form
 */
const asyncSubmitForm = async (
  username: string,
  formId: IForm["_id"],
  submissions: IFormSubmission
) => {
  try {
    const response = await axios.post("/forms/form-to-submit", {
      username,
      formId,
      submissions,
    });
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
