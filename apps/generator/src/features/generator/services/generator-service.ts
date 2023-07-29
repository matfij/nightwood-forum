import fs from 'fs-extra';
import archiver from 'archiver';
import { Transform } from 'stream';
import { GenerateParams } from '../models/generate-params';
import { WebsiteCompilerService } from './website-compiler-service';
import { DataSyncService } from '../../data-sync/services/data-sync-service';
import { ProjectRepository } from '../../projects/data-access/project-repository';
import {
    PROJECT_ARCHIEVE_FILENAME,
    PROJECT_ARCHIEVE_PATH,
    PROJECT_ASSETS_PATH,
    PROJECT_DIST_ASSETS_PATH,
    PROJECT_DIST_PATH,
    PROJECT_DIST_TEMPLATE_PATH,
} from '../utils/cache-paths';
import { FileUploadService } from '../../../common/file-upload/file-upload-service';

export class GeneratorService {
    private readonly HTML_TEMPLATE_PATH = 'src/features/generator/services/templates/index.html';

    constructor(
        private projectRepository: ProjectRepository,
        private dataSyncService: DataSyncService,
        private fileUploadService: FileUploadService,
    ) {}

    async generateWebsite(params: GenerateParams): Promise<string> {
        const project = await this.projectRepository.findOne({ id: params.projectId });
        if (!project || !project.id) {
            throw new Error('Project not found');
        }
        if (project.userId !== params.userId) {
            throw new Error('Access denied');
        }
        const projectBlocks = await this.dataSyncService.getSyncedProjectData(params.projectId);
        const content = WebsiteCompilerService.compile(projectBlocks);

        fs.removeSync(PROJECT_DIST_PATH(project.id));
        fs.copySync(this.HTML_TEMPLATE_PATH, PROJECT_DIST_TEMPLATE_PATH(project.id));
        fs.copySync(PROJECT_ASSETS_PATH(project.id), PROJECT_DIST_ASSETS_PATH(project.id));

        const readStream = fs.createReadStream(PROJECT_DIST_TEMPLATE_PATH(project.id));
        const writeStream = fs.createWriteStream(PROJECT_DIST_TEMPLATE_PATH(project.id));
        const transformStream = new Transform({
            transform(chunk, encoding, callback) {
                const replaceChunk = chunk
                    .toString()
                    .replace('#project-name#', project.notionName)
                    .replace('#project-content#', content);
                this.push(replaceChunk);
                callback();
            },
        });
        readStream.pipe(transformStream).pipe(writeStream);

        const outputStream = fs.createWriteStream(PROJECT_ARCHIEVE_PATH(project.id));
        const archieveStream = archiver('zip');
        archieveStream.pipe(outputStream);
        archieveStream.directory(PROJECT_DIST_PATH(project.id), false);
        await archieveStream.finalize();

        const downloadUrl = await this.fileUploadService.upload(
            PROJECT_ARCHIEVE_FILENAME(project.id),
            fs.createReadStream(PROJECT_ARCHIEVE_PATH(project.id)),
        );

        return downloadUrl;
    }
}
