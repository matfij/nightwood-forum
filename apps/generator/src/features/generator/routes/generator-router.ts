import { Router, NextFunction, Request, Response } from 'express';
import { GeneratorService } from '../services/generator-service';
import { DataSyncService } from '../services/data-sync-service';

export class GeneratorRouter {
    readonly path = '/generator';
    readonly router = Router();

    constructor(private dataSyncService: DataSyncService, private generatorService: GeneratorService) {
        this.initializeRoutes();
    }

    initializeRoutes = () => {
        this.router.post(`${this.path}/sync`, this.syncProjecData);
        this.router.post(`${this.path}/website`, this.generateWebsite);
    };

    syncProjecData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            await this.dataSyncService.syncProjectData(params);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).json({ message: `Failed to sync project data: ${error}` });
        }
    };

    generateWebsite = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const stream = (await this.generatorService.generateWebsite(params)).pipe(res);
            await new Promise<void>((resolve, reject) => {
                stream.on('end', () => {
                    res.end();
                    resolve();
                });
                stream.on('error', (error) => {
                    res.status(400).json(error);
                    reject();
                });
            });
        } catch (error) {
            res.status(400).json({ message: `Failed to generate website: ${error}` });
        }
    };
}
