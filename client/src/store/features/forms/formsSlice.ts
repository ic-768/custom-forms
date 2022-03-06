import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IForm from "../../../resources/IForm";

export interface FormsState {
  forms: IForm[];
}

const initialState: FormsState = {
  forms: [],
};

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    setForms: (state, action: PayloadAction<FormsState>) => {
      state.forms = action.payload.forms;
    },
    // TODO addform,remove form
  },
});

export const { setForms } = formsSlice.actions;
export default formsSlice.reducer;
