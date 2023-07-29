import { Router, NextFunction, Request, Response } from 'express';
import { GeneratorService } from '../services/generator-service';

export class GeneratorRouter {
    readonly path = '/generator';
    readonly router = Router();

    constructor(private generatorService: GeneratorService) {
        this.initializeRoutes();
    }

    initializeRoutes = () => {
        this.router.post(`${this.path}/website`, this.generateWebsite);
    };

    generateWebsite = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const downloadUrl = await this.generatorService.generateWebsite(params);
            res.status(200).send(downloadUrl);
        } catch (error) {
            res.status(400).json({ message: `Failed to generate website: ${error}` });
        }
    };
}
