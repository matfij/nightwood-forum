import { Router, NextFunction, Request, Response } from 'express';
import { ProjectsService } from '../services/projects-service';

export class ProjectsRouter {
    readonly path = '/projects';
    readonly router = Router();

    constructor(private projectsService: ProjectsService) {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(`${this.path}/create`, this.createProject);
        this.router.post(`${this.path}/read`, this.readProjects);
    }

    async createProject(req: Request, res: Response, next: NextFunction) {
        const params = req.body;
        const project = this.projectsService.createProject(params);
        res.status(201).json(project);
    }

    async readProjects(req: Request, res: Response, next: NextFunction) {
        const params = req.body;
        const projects = this.projectsService.readProjects(params);
        res.status(200).json(projects);
    }
}
