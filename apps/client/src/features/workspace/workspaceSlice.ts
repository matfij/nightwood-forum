import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Project } from './models';

type WorkspaceState = {
    projects: Project[];
};

const initialState: WorkspaceState = {
    projects: [],
};

const workspaceSlice = createSlice({
    name: 'workspace',
    initialState: initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload;
        },
    },
});

export default workspaceSlice.reducer;
export const { setProjects } = workspaceSlice.actions;
