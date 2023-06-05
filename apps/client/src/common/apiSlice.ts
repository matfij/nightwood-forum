import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninDto, AuthUserDto } from '../features/auth/models';
import { Project } from '../features/workspace/models';
import { RootState } from './store';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:14000/api',
    }),
    endpoints(build) {
        return {
            signin: build.mutation<AuthUserDto, SigninDto>({
                query: (user) => ({
                    url: '/auth/signin',
                    method: 'POST',
                    body: user,
                }),
            }),
        };
    },
});

export const authApiSlice = createApi({
    reducerPath: 'authApi',
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
            getProjects: build.query<Project[], void>({
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
                    },
                    cache: 'no-cache',
                }),
            }),
        };
    },
});

export const { useSigninMutation } = apiSlice;
export const { useGetProjectsQuery, useGenerateWebsiteQuery } = authApiSlice;
