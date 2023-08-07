import { SIGNIN_MUTATION } from '../../src/common/gql/gql-operations';

export const signinSuccessMock = (username: string, password: string) => ({
    request: {
        query: SIGNIN_MUTATION,
        variables: {
            signinDto: {
                username: username,
                password: password,
            },
        },
    },
    result: {
        data: {
            signin: {
                id: 'id',
                username: 'test',
                accessToken: 'string',
                refreshToken: 'strin',
            },
        },
    },
});

export const signinErrorMock = (username: string, password: string, error: string) => ({
    request: {
        query: SIGNIN_MUTATION,
        variables: {
            signinDto: {
                username: username,
                password: password,
            },
        },
    },
    error: new Error(error),
});
