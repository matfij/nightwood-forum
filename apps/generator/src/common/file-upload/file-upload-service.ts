export interface FileUploadService {
    upload: (name: string, content: any) => Promise<string>;
}
