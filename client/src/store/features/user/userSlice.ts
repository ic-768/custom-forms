import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface UserState {
  username: string;
}

const initialState: UserState = {
  username: "",
};

const userSlice = createSlice({
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

const selectUser = (state: RootState) => state.user.username;
const { removeUser, setUser } = userSlice.actions;

export { selectUser, removeUser, setUser };
export default userSlice.reducer;
