import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FormProps } from "resources/shared";
import { RootState } from "store/store";

export interface FormsState {
  forms: FormProps[];
}

const initialState: FormsState = {
  forms: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<FormProps[]>) => {
      state.forms = action.payload;
    },
    addForm: (state, action: PayloadAction<FormProps>) => {
      state.forms.push(action.payload);
    },
    updateForm: (state, action: PayloadAction<FormProps>) => {
      state.forms = state.forms.map((f) =>
        f._id === action.payload._id ? action.payload : f
      );
    },
    deleteForm: (state, action: PayloadAction<FormProps["_id"]>) => {
      state.forms = state.forms.filter((f) => f._id !== action.payload);
    },
    deleteMultipleForms: (state, action: PayloadAction<FormProps["_id"][]>) => {
      state.forms = state.forms.filter((f) => !action.payload.includes(f._id));
    },
  },
});

const selectForms = (state: RootState): FormProps[] => state.forms.forms;
const { setForms, addForm, updateForm, deleteForm, deleteMultipleForms } =
  formsSlice.actions;

export default formsSlice.reducer;
export {
  selectForms,
  setForms,
  addForm,
  updateForm,
  deleteForm,
  deleteMultipleForms,
};
