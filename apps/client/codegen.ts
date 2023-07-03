import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:14000/graphql',
    documents: ['src/**/*.ts'],
    generates: {
        './src/common/gql-client.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                withHooks: true,
                withHOC: false,
                withComponent: false,
                useIndexSignature: true,
            },
        },
    },
};

export default config;
