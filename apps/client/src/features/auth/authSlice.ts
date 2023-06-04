import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthUserDto } from './models';
import { RootState } from '../../common/store';
import { PersistenceService } from '../../common/persistence.service';

export type AuthState = {
    username: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuth: boolean;
};

const initialState: AuthState = PersistenceService.getAuthState() || {
    username: null,
    accessToken: null,
    refreshToken: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setSigninData: (state, action: PayloadAction<AuthUserDto>) => {
            state.isAuth = true;
            state.username = action.payload.username;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setUsername: (state, action: PayloadAction<string | null>) => {
            state.username = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action: PayloadAction<string | null>) => {
            state.refreshToken = action.payload;
        },
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
    },
});

export default authSlice.reducer;
export const { setSigninData, setUsername, setAccessToken, setRefreshToken, setIsAuth } = authSlice.actions;

export const currentUser = (state: RootState) => state.auth;
