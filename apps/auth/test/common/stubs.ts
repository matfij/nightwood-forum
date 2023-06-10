import { ProjectCreateDto } from '../../src/modules/gateway/models/project-create.dto';
import { ProjectDto } from '../../src/modules/gateway/models/project.dto';

export const getProjectCreateDtoStub = (): ProjectCreateDto => {
    return {
        notionId: 'ad28575abb1e4fcb93451223f2c18397',
        notionName: 'Mongo Tutorial',
        notionAccessCode: 'secret_CtULdk029ked0239dkdw0rslZFELXI',
    };
};

export const getProjectDtoStub = (userId?: string): ProjectDto => {
    return {
        userId: userId ?? '566e34f5-1e3a-46b3-aaf5-9d2f9619c7ca',
        notionId: 'ad28575abb1e4fcb93451223f2c18397',
        notionName: 'Mongo Tutorial',
        notionAccessCode: 'secret_CtULdk029ked0239dkdw0rslZFELXI',
        createdAt: 1684527619394,
        id: '6467da03e88b553e9546c8a9',
    };
};
