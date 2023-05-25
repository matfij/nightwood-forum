import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninDto, AuthUserDto } from '../features/auth/models';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:14000/api',
        // prepareHeaders(headers) {
        //     const accessToken = 'TODO';
        //     headers.set('Authentication', `Bearer ${accessToken}`);
        //     return headers;
        // },
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

export const { useSigninMutation } = apiSlice;
