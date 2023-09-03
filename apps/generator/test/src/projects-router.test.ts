import request from 'supertest';
import { app } from '../../src/app';
import { CreateProjectParams } from '../../src/features/projects/models/create-project-params';
import { ReadOneProjectParams } from '../../src/features/projects/models/read-one-project-params';

describe('ProjectsRouter', () => {
    it('should create a new project', async () => {
        const params: CreateProjectParams = {
            userId: 'u-1',
            notionId: 'nid-1',
            notionName: 'Reading List',
            notionAccessCode: 'nac-1',
        };

        const res = await request(app).post('/projects/create').send(params);

        expect(res.status).toEqual(201);
        expect(res.body.userId).toEqual(params.userId);
        expect(res.body.notionName).toEqual(params.notionName);
    });

    it('should failt to create a new project with invalid request body', async () => {
        const params: Omit<CreateProjectParams, 'notionId'> = {
            userId: 'u-1',
            notionName: 'Reading List',
            notionAccessCode: 'nac-1',
        };

        const res = await request(app).post('/projects/create').send(params);

        expect(res.status).toEqual(400);
        expect(res.body.message).toContain('notionId');
    });

    it('should read a single project', async () => {
        const params: ReadOneProjectParams = {
            userId: 'u-1',
            projectId: 'p-1',
        };

        const res = await request(app).post('/projects/readOne').send(params);

        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(params.projectId);
        expect(res.body.userId).toEqual(params.userId);
        expect(res.body.notionName).toBeDefined();
    });

    it('should fail to read a non-existing project', async () => {
        const params: ReadOneProjectParams = {
            userId: 'u-1',
            projectId: 'NOT_HERE',
        };

        const res = await request(app).post('/projects/readOne').send(params);

        expect(res.status).toEqual(400);
        expect(res.body.message).toContain('not found');
    });
});
