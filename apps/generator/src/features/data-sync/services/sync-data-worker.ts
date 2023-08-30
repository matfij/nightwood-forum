import fs from 'fs-extra';
import { parentPort } from 'worker_threads';
import { PROJECT_ASSETS_PATH, PROJECT_CACHE_PATH, PROJECT_CONTENT_PATH } from '../../generator/utils/cache-paths';
import { NotionClientService } from './notion-client-service';
import { NotionParserService } from './notion-parser-service';
import { Project } from '../../projects/models/project-model';

parentPort?.on('message', async (projectData: { _doc: Project }) => {
    try {
        const { _doc: project } = projectData;
        if (!project || !project.id || !project.notionId || !project.notionAccessCode) {
            parentPort?.postMessage({ success: false });
            return;
        }
        fs.removeSync(PROJECT_CACHE_PATH(project.id));
        if (!fs.existsSync(PROJECT_CACHE_PATH(project.id))) {
            fs.mkdirSync(PROJECT_CACHE_PATH(project.id));
        }
        if (!fs.existsSync(PROJECT_ASSETS_PATH(project.id))) {
            fs.mkdirSync(PROJECT_ASSETS_PATH(project.id));
        }
        const notionBlocks = await NotionClientService.readPageBlocks(project.notionId, project.notionAccessCode);
        const parsedBlocks = await NotionParserService.parseBlocks(project.id, notionBlocks);
        fs.outputFileSync(PROJECT_CONTENT_PATH(project.id), JSON.stringify(parsedBlocks), {
            encoding: 'utf-8',
        });
        parentPort?.postMessage({ success: true });
    } catch (err) {
        parentPort?.postMessage({ success: false });
    }
});
