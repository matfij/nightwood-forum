import { Router, Request, Response, NextFunction } from 'express';
import { ProjectsService } from '../services/projects-service';

export class ProjectsRouter {
    readonly path = '/projects';
    readonly router = Router();

    constructor(private projectsService: ProjectsService) {
        this.initializeRoutes();
    }

    initializeRoutes = () => {
        this.router.post(`${this.path}/create`, this.create);
        this.router.post(`${this.path}/readOne`, this.readOne);
        this.router.post(`${this.path}/readAll`, this.readAll);
        this.router.post(`${this.path}/update`, this.update);
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        const project = await this.projectsService.create(params);
        res.status(201).json(project);
    };

    readOne = async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        const projects = await this.projectsService.readOne(params);
        res.status(200).json(projects);
    };

    readAll = async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        const projects = await this.projectsService.readAll(params);
        res.status(200).json(projects);
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        const params = req.body;
        const project = await this.projectsService.update(params);
        res.status(200).json(project);
    }
}
