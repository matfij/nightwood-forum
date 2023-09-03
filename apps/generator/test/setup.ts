import { awsFileUploadServiceMock } from './mocks/aws-file-upload-service';
import { dataSyncServiceMock } from './mocks/data-sync-service.mock';
import { mongoProjectRepositoryMock } from './mocks/mongo-project-repository.mock';

jest.mock('../src/features/projects/data-access/mongo-project-repository', () => ({
    MongoProjectRepository: jest.fn(() => mongoProjectRepositoryMock),
}));

jest.mock('../src/features/data-sync/services/data-sync-service', () => ({
    DataSyncService: jest.fn(() => dataSyncServiceMock),
}));

jest.mock('../src/common/file-upload/aws-file-upload-service', () => ({
    AwsFileUploadService: jest.fn(() => awsFileUploadServiceMock)
}))
