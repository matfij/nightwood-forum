import { gql } from '@apollo/client';

export const ME_QUERY = gql`
    query Me {
        me {
            id
            username
        }
    }
`;

export const PROJECTS_QUERY = gql`
    query Projects {
        projects {
            id
            userId
            notionId
            notionName
            notionAccessCode
            config {
                fontUrl
                fontColor
                fontFamily
                backgroundColor
                heading {
                    fontSize
                    fontWeight
                    margin
                }
                paragraph {
                    fontSize
                    fontWeight
                    margin
                }
            }
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export const PROJECT_QUERY = gql`
    query Project($id: String!) {
        project(id: $id) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            config {
                fontUrl
                fontColor
                fontFamily
                backgroundColor
                heading {
                    fontSize
                    fontWeight
                    margin
                }
                paragraph {
                    fontSize
                    fontWeight
                    margin
                }
            }
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export const SIGNUP_MUTATION = gql`
    mutation Signup($signupDto: SignupDto!) {
        signup(signupDto: $signupDto) {
            id
            username
            accessToken
            refreshToken
        }
    }
`;

export const SIGNIN_MUTATION = gql`
    mutation Signin($signinDto: SigninDto!) {
        signin(signinDto: $signinDto) {
            id
            username
            accessToken
            refreshToken
        }
    }
`;

export const REFRESH_TOKEN_MUTATION = gql`
    mutation RefreshToken($refreshTokenDto: RefreshTokenDto!) {
        refreshToken(refreshTokenDto: $refreshTokenDto) {
            token
        }
    }
`;

export const CREATE_PROJECT_MUTATION = gql`
    mutation CreateProject($projectCreateDto: ProjectCreateDto!) {
        createProject(projectCreateDto: $projectCreateDto) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            config {
                fontUrl
                fontColor
                fontFamily
                backgroundColor
                heading {
                    fontSize
                    fontWeight
                    margin
                }
                paragraph {
                    fontSize
                    fontWeight
                    margin
                }
            }
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export const UPDATE_PROJECT_MUTATION = gql`
    mutation UpdateProject($projectUpdateDto: ProjectUpdateDto!) {
        updateProject(projectUpdateDto: $projectUpdateDto) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            config {
                fontUrl
                fontColor
                fontFamily
                backgroundColor
                heading {
                    fontSize
                    fontWeight
                    margin
                }
                paragraph {
                    fontSize
                    fontWeight
                    margin
                }
            }
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export const UPDATE_PROJECT_CONFIG_MUTATION = gql`
    mutation UpdateProjectConfig($projectConfigUpdateDto: ProjectConfigUpdateDto!) {
        updateProjectConfig(projectConfigUpdateDto: $projectConfigUpdateDto) {
            id
            userId
            notionId
            notionName
            notionAccessCode
            config {
                fontUrl
                fontColor
                fontFamily
                backgroundColor
                heading {
                    fontSize
                    fontWeight
                    margin
                }
                paragraph {
                    fontSize
                    fontWeight
                    margin
                }
            }
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export const SYNC_MUTATION = gql`
    mutation Sync($id: String!) {
        sync(id: $id)
    }
`;

export const GENERATE_WEBSITE_MUTATION = gql`
    mutation GenerateWebsite($id: String!) {
        generateWebsite(id: $id)
    }
`;
