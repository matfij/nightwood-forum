import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    File: { input: any; output: any };
};

export type AccessTokenDto = {
    __typename?: 'AccessTokenDto';
    token: Scalars['String']['output'];
};

export type AuthUserDto = {
    __typename?: 'AuthUserDto';
    accessToken: Scalars['String']['output'];
    id: Scalars['String']['output'];
    refreshToken: Scalars['String']['output'];
    username: Scalars['String']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createProject: ProjectDto;
    generateWebsite: Scalars['File']['output'];
    refreshToken: AccessTokenDto;
    signin: AuthUserDto;
    signup: AuthUserDto;
    sync: Scalars['String']['output'];
};

export type MutationCreateProjectArgs = {
    projectCreateDto: ProjectCreateDto;
};

export type MutationGenerateWebsiteArgs = {
    id: Scalars['String']['input'];
};

export type MutationRefreshTokenArgs = {
    refreshTokenDto: RefreshTokenDto;
};

export type MutationSigninArgs = {
    signinDto: SigninDto;
};

export type MutationSignupArgs = {
    signupDto: SignupDto;
};

export type MutationSyncArgs = {
    id: Scalars['String']['input'];
};

export type ProjectCreateDto = {
    notionAccessCode: Scalars['String']['input'];
    notionId: Scalars['String']['input'];
    notionName: Scalars['String']['input'];
};

export type ProjectDto = {
    __typename?: 'ProjectDto';
    createdAt?: Maybe<Scalars['Int']['output']>;
    id: Scalars['String']['output'];
    notionAccessCode: Scalars['String']['output'];
    notionId: Scalars['String']['output'];
    notionName: Scalars['String']['output'];
    user?: Maybe<UserDto>;
    userId: Scalars['String']['output'];
};

export type Query = {
    __typename?: 'Query';
    me: UserDto;
    project: ProjectDto;
    projects: Array<ProjectDto>;
};

export type QueryProjectArgs = {
    id: Scalars['String']['input'];
};

export type RefreshTokenDto = {
    token: Scalars['String']['input'];
};

export type SigninDto = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type SignupDto = {
    password: Scalars['String']['input'];
    username: Scalars['String']['input'];
};

export type UserDto = {
    __typename?: 'UserDto';
    id: Scalars['String']['output'];
    password?: Maybe<Scalars['String']['output']>;
    projects?: Maybe<Array<ProjectDto>>;
    username: Scalars['String']['output'];
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query'; me: { __typename?: 'UserDto'; id: string; username: string } };

export type ProjectsQueryVariables = Exact<{ [key: string]: never }>;

export type ProjectsQuery = {
    __typename?: 'Query';
    projects: Array<{
        __typename?: 'ProjectDto';
        id: string;
        userId: string;
        notionId: string;
        notionName: string;
        notionAccessCode: string;
        createdAt?: number | null;
        user?: { __typename?: 'UserDto'; id: string; username: string } | null;
    }>;
};

export type ProjectQueryVariables = Exact<{
    id: Scalars['String']['input'];
}>;

export type ProjectQuery = {
    __typename?: 'Query';
    project: {
        __typename?: 'ProjectDto';
        id: string;
        userId: string;
        notionId: string;
        notionName: string;
        notionAccessCode: string;
        createdAt?: number | null;
        user?: { __typename?: 'UserDto'; id: string; username: string } | null;
    };
};

export type SignupMutationVariables = Exact<{
    signupDto: SignupDto;
}>;

export type SignupMutation = {
    __typename?: 'Mutation';
    signup: { __typename?: 'AuthUserDto'; id: string; username: string; accessToken: string; refreshToken: string };
};

export type SigninMutationVariables = Exact<{
    signinDto: SigninDto;
}>;

export type SigninMutation = {
    __typename?: 'Mutation';
    signin: { __typename?: 'AuthUserDto'; id: string; username: string; accessToken: string; refreshToken: string };
};

export type RefreshTokenMutationVariables = Exact<{
    refreshTokenDto: RefreshTokenDto;
}>;

export type RefreshTokenMutation = {
    __typename?: 'Mutation';
    refreshToken: { __typename?: 'AccessTokenDto'; token: string };
};

export type CreateProjectMutationVariables = Exact<{
    projectCreateDto: ProjectCreateDto;
}>;

export type CreateProjectMutation = {
    __typename?: 'Mutation';
    createProject: {
        __typename?: 'ProjectDto';
        id: string;
        userId: string;
        notionId: string;
        notionName: string;
        notionAccessCode: string;
        createdAt?: number | null;
        user?: { __typename?: 'UserDto'; id: string; username: string } | null;
    };
};

export type SyncMutationVariables = Exact<{
    id: Scalars['String']['input'];
}>;

export type SyncMutation = { __typename?: 'Mutation'; sync: string };

export type GenerateWebsiteMutationVariables = Exact<{
    id: Scalars['String']['input'];
}>;

export type GenerateWebsiteMutation = { __typename?: 'Mutation'; generateWebsite: any };

export const MeDocument = gql`
    query Me {
        me {
            id
            username
        }
    }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProjectsDocument = gql`
    query Projects {
        projects {
            id
            userId
            notionId
            notionName
            notionAccessCode
            createdAt
            user {
                id
                username
            }
        }
    }
`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
}
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: String!) {
        project(id: $id) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            createdAt
            user {
                id
                username
            }
        }
    }
`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
}
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
}
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const SignupDocument = gql`
    mutation Signup($signupDto: SignupDto!) {
        signup(signupDto: $signupDto) {
            id
            username
            accessToken
            refreshToken
        }
    }
`;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      signupDto: // value for 'signupDto'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const SigninDocument = gql`
    mutation Signin($signinDto: SigninDto!) {
        signin(signinDto: $signinDto) {
            id
            username
            accessToken
            refreshToken
        }
    }
`;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinDto: // value for 'signinDto'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshTokenDto: RefreshTokenDto!) {
        refreshToken(refreshTokenDto: $refreshTokenDto) {
            token
        }
    }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshTokenDto: // value for 'refreshTokenDto'
 *   },
 * });
 */
export function useRefreshTokenMutation(
    baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
>;
export const CreateProjectDocument = gql`
    mutation CreateProject($projectCreateDto: ProjectCreateDto!) {
        createProject(projectCreateDto: $projectCreateDto) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            createdAt
            user {
                id
                username
            }
        }
    }
`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectCreateDto: // value for 'projectCreateDto'
 *   },
 * });
 */
export function useCreateProjectMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
}
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<
    CreateProjectMutation,
    CreateProjectMutationVariables
>;
export const SyncDocument = gql`
    mutation Sync($id: String!) {
        sync(id: $id)
    }
`;
export type SyncMutationFn = Apollo.MutationFunction<SyncMutation, SyncMutationVariables>;

/**
 * __useSyncMutation__
 *
 * To run a mutation, you first call `useSyncMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncMutation, { data, loading, error }] = useSyncMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSyncMutation(baseOptions?: Apollo.MutationHookOptions<SyncMutation, SyncMutationVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<SyncMutation, SyncMutationVariables>(SyncDocument, options);
}
export type SyncMutationHookResult = ReturnType<typeof useSyncMutation>;
export type SyncMutationResult = Apollo.MutationResult<SyncMutation>;
export type SyncMutationOptions = Apollo.BaseMutationOptions<SyncMutation, SyncMutationVariables>;
export const GenerateWebsiteDocument = gql`
    mutation GenerateWebsite($id: String!) {
        generateWebsite(id: $id)
    }
`;
export type GenerateWebsiteMutationFn = Apollo.MutationFunction<
    GenerateWebsiteMutation,
    GenerateWebsiteMutationVariables
>;

/**
 * __useGenerateWebsiteMutation__
 *
 * To run a mutation, you first call `useGenerateWebsiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateWebsiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateWebsiteMutation, { data, loading, error }] = useGenerateWebsiteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGenerateWebsiteMutation(
    baseOptions?: Apollo.MutationHookOptions<GenerateWebsiteMutation, GenerateWebsiteMutationVariables>,
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<GenerateWebsiteMutation, GenerateWebsiteMutationVariables>(
        GenerateWebsiteDocument,
        options,
    );
}
export type GenerateWebsiteMutationHookResult = ReturnType<typeof useGenerateWebsiteMutation>;
export type GenerateWebsiteMutationResult = Apollo.MutationResult<GenerateWebsiteMutation>;
export type GenerateWebsiteMutationOptions = Apollo.BaseMutationOptions<
    GenerateWebsiteMutation,
    GenerateWebsiteMutationVariables
>;
