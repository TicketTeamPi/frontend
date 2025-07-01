import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id?: string | null;
  name: string | null;
  email: string | null;
  token?: string | null;
  accesstoken: {
    token: string;
  };
  isAuthenticated?: boolean;
  isAdmin?: number;
  sector_id: string | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  token: null,
  accesstoken: {
    token: "",
  },
  isAuthenticated: false,
  isAdmin: 0,
        sector_id: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.accesstoken.token = action.payload.accesstoken?.token || "";
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.isAdmin = action.payload.isAdmin;
      state.sector_id = action.payload.sector_id
    },
    resetUser: (state) => {
      state = initialState;
    },
  },
});

export const { login, resetUser } = userSlice.actions;

export default userSlice.reducer;
