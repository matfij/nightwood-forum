import { FieldMiddleware } from '@nestjs/graphql';

export const RemoveFieldMiddleware: FieldMiddleware = async () => {
    return undefined;
};
