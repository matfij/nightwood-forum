import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apiSlice, authApiSlice } from './apiSlice';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSigninData } from '../features/auth/authSlice';
import { PersistenceService } from './persistence.service';

const persistenceMiddleware = createListenerMiddleware();
persistenceMiddleware.startListening({
    actionCreator: setSigninData,
    effect: (_action, { getState }) => {
        PersistenceService.setAuthState((getState() as RootState).auth);
    },
});

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            apiSlice.middleware,
            authApiSlice.middleware,
            persistenceMiddleware.middleware,
        );
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
