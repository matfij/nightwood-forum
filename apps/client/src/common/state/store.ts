import { configureStore } from '@reduxjs/toolkit';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/state/authSlice';
import projectsReducer from '../../features/workspace/state/projectsSlice';
import { PersistenceService } from './persistence.service';
import { authApiSlice } from '../../features/auth/state/authApiSlice';
import { setSigninData } from '../../features/auth/state/authSlice';
import { projectsApiSlice } from '../../features/workspace/state/projectsApiSlice';

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
