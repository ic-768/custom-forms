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
    setForms: (state, action: PayloadAction<FormsState>) => {
      state.forms = action.payload.forms;
    },
    // TODO addform,remove form
  },
});

const selectForms = (state: RootState) => state.forms.forms;
const { setForms } = formsSlice.actions;

export default formsSlice.reducer;
export { selectForms, setForms };
