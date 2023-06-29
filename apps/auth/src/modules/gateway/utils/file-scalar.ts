import { GraphQLScalarType } from 'graphql';

export const FileScalar = new GraphQLScalarType({
    name: 'File',
    description: 'Downloadable file',
});
