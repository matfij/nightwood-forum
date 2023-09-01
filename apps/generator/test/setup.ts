import { mockMongoProjectRepository } from './mocks/mongo-project-repository.mock';

jest.mock('../src/features/projects/data-access/mongo-project-repository', () => ({
    MongoProjectRepository: jest.fn(() => mockMongoProjectRepository),
}));
