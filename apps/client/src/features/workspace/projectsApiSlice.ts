import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../common/store';
import { ProjectCreateDto, ProjectDto } from './models';

export const projectsApiSlice = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:14000/api',
        prepareHeaders(headers, { getState }) {
            const accessToken = (getState() as RootState).auth.accessToken;
            headers.set('Authorization', `Bearer ${accessToken}`);
            return headers;
        },
    }),
    tagTypes: ['Projects'],
    endpoints(build) {
        return {
            addProject: build.mutation<ProjectDto, ProjectCreateDto>({
                query: (body) => ({
                    url: '/generator/projects',
                    method: 'POST',
                    body: body,
                }),
            }),
            getProjects: build.query<ProjectDto[], void>({
                query: () => ({ url: '/generator/projects' }),
            }),
            generateWebsite: build.query<void, string>({
                query: (projectId) => ({
                    url: `/generator/website/${projectId}`,
                    responseHandler: async (response) => {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${projectId}.html`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                        return true;
                    },
                    cache: 'no-store',
                }),
            }),
        };
    },
});

export const { useAddProjectMutation, useGetProjectsQuery, useGenerateWebsiteQuery } = projectsApiSlice;
