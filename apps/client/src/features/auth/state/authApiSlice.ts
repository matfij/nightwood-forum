import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthUserDto, SigninDto } from '../../../common/gql/gql-client';

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:14000/api',
    }),
    endpoints(build) {
        return {
            signin: build.mutation<AuthUserDto, SigninDto>({
                query: (body) => ({
                    url: '/auth/signin',
                    method: 'POST',
                    body: body,
                }),
            }),
            signup: build.mutation<AuthUserDto, SigninDto>({
                query: (body) => ({
                    url: '/auth/signup',
                    method: 'POST',
                    body: body
                })
            })
        };
    },
});

export const { useSigninMutation, useSignupMutation } = authApiSlice;
