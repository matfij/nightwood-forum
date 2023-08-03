import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProjectCreateDto, ProjectDto } from '../../../common/gql/gql-client';
import { RootState } from '../../../common/state/store';

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
            syncWebsiteData: build.query<void, string>({
                query: (projectId) => ({
                    url: `/generator/sync/${projectId}`,
                    cache: 'no-cache',
                }),
            }),
            generateWebsite: build.query<void, string>({
                query: (projectId) => ({
                    url: `/generator/website/${projectId}`,
                    responseHandler: async (response) => {
                        if (response.status !== 200) {
                            return true;
                        }
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${projectId}.zip`);
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

export const { useAddProjectMutation, useGetProjectsQuery, useSyncWebsiteDataQuery, useGenerateWebsiteQuery } =
    projectsApiSlice;
