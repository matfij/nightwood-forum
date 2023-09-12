import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProjectDto } from '../../../common/gql/gql-client';

export type ProjectsState = {
    projects: ProjectDto[];
};

const initialState: ProjectsState = {
    projects: [],
};

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        setProjects: (state, action: PayloadAction<ProjectDto[]>) => {
            state.projects = action.payload;
        },
        appendProject: (state, action: PayloadAction<ProjectDto>) => {
            state.projects = [...state.projects, action.payload];
        },
        updateProject: (state, action: PayloadAction<ProjectDto>) => {
            state.projects = state.projects.map((project) => {
                if (project.id === action.payload.id) {
                    return action.payload;
                }
                return project;
            });
        },
    },
});

export default projectsSlice.reducer;
export const { setProjects, appendProject, updateProject } = projectsSlice.actions;
