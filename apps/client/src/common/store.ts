import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import projectsReducer from '../features/workspace/projectsSlice';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { setSigninData } from '../features/auth/authSlice';
import { PersistenceService } from './persistence.service';
import { authApiSlice } from '../features/auth/authApiSlice';
import { projectsApiSlice } from '../features/workspace/projectsApiSlice';

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
        projects: projectsReducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authApiSlice.middleware,
            projectsApiSlice.middleware,
            persistenceMiddleware.middleware,
        );
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
