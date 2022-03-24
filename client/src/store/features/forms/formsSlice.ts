import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IForm } from "../../../pages/FormBuilder/resources/shared";
import { RootState } from "../../store";

export interface FormsState {
  forms: IForm[];
}

const initialState: FormsState = {
  forms: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<IForm[]>) => {
      state.forms = action.payload;
    },
    addForm: (state, action: PayloadAction<IForm>) => {
      state.forms.push(action.payload);
    },
    updateForm: (state, action: PayloadAction<IForm>) => {
      state.forms = state.forms.map((f) =>
        f._id === action.payload._id ? action.payload : f
      );
    },
    deleteForm: (state, action: PayloadAction<IForm["_id"]>) => {
      state.forms = state.forms.filter((f) => f._id !== action.payload);
    },
  },
});

const selectForms = (state: RootState) => state.forms.forms;
const { setForms, addForm, updateForm, deleteForm } = formsSlice.actions;

export default formsSlice.reducer;
export { selectForms, setForms, addForm, updateForm, deleteForm };
