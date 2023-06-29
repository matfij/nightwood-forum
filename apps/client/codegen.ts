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
                // {
                //     'typescript-rtk-query': {
                //         importBaseApiFrom: 'src\\features\\auth\\authApiSlice',
                //         exportHooks: true,
                //     },
                // },
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
