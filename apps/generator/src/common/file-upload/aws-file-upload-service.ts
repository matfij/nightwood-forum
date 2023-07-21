import S3 from 'aws-sdk/clients/s3';
import { FileUploadService } from './file-upload-service';
import {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_S3_BUCKET_ID,
    AWS_DOWNLOAD_LINK_MAX_AGE_SECONDS,
} from '../config';

export class AwsFileUploadService implements FileUploadService {
    private s3: S3;

    constructor() {
        this.s3 = new S3({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            signatureVersion: 'v4',
        });
    }

    async upload(name: string, content: any): Promise<string> {
        await this.s3
            .upload({
                Bucket: AWS_S3_BUCKET_ID,
                Body: content,
                Key: name,
            })
            .promise();
        const downloadUrl = this.generatePresignedUrl(name);
        return downloadUrl;
    }

    private generatePresignedUrl(name: string): string {
        const params = {
            Bucket: AWS_S3_BUCKET_ID,
            Expires: AWS_DOWNLOAD_LINK_MAX_AGE_SECONDS,
            Key: name,
        };
        return this.s3.getSignedUrl('getObject', params);
    }
}
