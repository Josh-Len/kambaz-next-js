// accountReducer.ts (or wherever this lives)
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AccountUser = {
  _id: string;
  username: string;
  role: string; // "ADMIN" | "STUDENT" | etc.
  // add any other fields you want, or leave it at this
};

export type AccountState = {
  currentUser: AccountUser | null;
};

const initialState: AccountState = {
  currentUser: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AccountUser | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;
