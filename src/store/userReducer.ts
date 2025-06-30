import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id?: string | null;
    name: string | null;
    email: string | null;
    token?: string | null;
    accesstoken: {
        token: string;
    };
    isAuthenticated?: boolean;
}

const initialState: UserState = {
        id: null,
        name: null,
        email: null,
        token: null,
        accesstoken: {
            token: ""
        },
        isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            console.log(action, "action")
            state.id = action.payload.id
            state.accesstoken.token = action.payload.accesstoken?.token || ""
            state.email = action.payload.email
            state.name = action.payload.name
        },
        resetUser(state) {
            state = initialState;
        }
    }
});

export const {
    login,
} = userSlice.actions;

export default userSlice.reducer;