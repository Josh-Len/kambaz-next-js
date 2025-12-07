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
  authReady: boolean;
};

const initialState: AccountState = {
  currentUser: null,
  authReady: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<AccountUser | null>) => {
      state.currentUser = action.payload;
    },
    setAuthReady: (state, action: PayloadAction<boolean>) => {
      state.authReady = action.payload;
    },
  },
});

export const { setCurrentUser, setAuthReady } = accountSlice.actions;
export default accountSlice.reducer;
