import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
};

const initialState: AuthState = {
    username: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setUsername, setAccessToken, setRefreshToken } = authSlice.actions;
