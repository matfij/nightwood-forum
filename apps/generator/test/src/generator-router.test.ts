import request from 'supertest';
import { app } from '../../src/app';
import { GenerateParams } from '../../src/features/generator/models/generate-params';

describe('GeneratorRouter', () => {
    it('should generate a website for a project with previously synced data', async () => {
        const params: GenerateParams = {
            userId: 'u-1',
            projectId: 'p-1',
        };

        const res = await request(app).post('/generator/website').send(params);

        expect(res.status).toEqual(200);
        expect(res.text).toContain('s3.amazonaws.com');
    });

    it('should fail to generate a website without synced data', async () => {
        const params: GenerateParams = {
            userId: 'u-1',
            projectId: 'NOT_SYNCED',
        };

        const res = await request(app).post('/generator/website').send(params);
        console.log(res)
        expect(res.status).toEqual(400);
        expect(res.body.message).toContain('not synced');
    });

    it('should fail to generate a website for a non-existing project', async () => {
        const params: GenerateParams = {
            userId: 'u-1',
            projectId: 'NOT_HERE',
        };

        const res = await request(app).post('/generator/website').send(params);

        expect(res.status).toEqual(400);
        expect(res.body.message).toContain('not found');
    });
});
