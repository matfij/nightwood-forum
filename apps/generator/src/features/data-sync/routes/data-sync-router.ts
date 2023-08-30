import { Router, Request, Response, NextFunction } from 'express';
import { DataSyncService } from '../services/data-sync-service';

export class DataSyncRouter {
    readonly path = '/dataSync';
    readonly router = Router();

    constructor(private dataSyncService: DataSyncService) {
        this.initializeRoutes();
    }

    initializeRoutes = () => {
        this.router.post(`${this.path}/project`, this.syncProjectData);
    };

    syncProjectData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            await this.dataSyncService.syncProjectData(params);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    };
}
