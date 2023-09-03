import { FileUploadService } from '../../src/common/file-upload/file-upload-service';

export const awsFileUploadServiceMock: Partial<FileUploadService> = {
    upload: jest.fn().mockResolvedValue('http://s3.amazonaws.com/website'),
};
