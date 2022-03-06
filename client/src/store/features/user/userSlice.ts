import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.username = "";
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeUser, setUser } = userSlice.actions;
export default userSlice.reducer;
