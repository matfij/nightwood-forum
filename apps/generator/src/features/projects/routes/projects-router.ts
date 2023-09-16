import { Router, Request, Response, NextFunction } from 'express';
import { ProjectsService } from '../services/projects-service';
import { bodyValidator } from '../../../common/middlewares/body-validator';
import { CreateProjectParams } from '../models/create-project-params';
import { UpdateProjectParams } from '../models/update-project-params';
import { ReadOneProjectParams } from '../models/read-one-project-params';
import { ReadAllProjectsParams } from '../models/read-all-projects-params';
import { UpdateProjectConfigParams } from '../models/update-project-config-params';

export class ProjectsRouter {
    readonly path = '/projects';
    readonly router = Router();

    constructor(private projectsService: ProjectsService) {
        this.initializeRoutes();
    }

    initializeRoutes = () => {
        this.router.post(`${this.path}/create`, bodyValidator(CreateProjectParams), this.create);
        this.router.post(`${this.path}/readOne`, bodyValidator(ReadOneProjectParams), this.readOne);
        this.router.post(`${this.path}/readAll`, bodyValidator(ReadAllProjectsParams), this.readAll);
        this.router.post(`${this.path}/update`, bodyValidator(UpdateProjectParams), this.update);
        this.router.post(`${this.path}/updateConfig`, bodyValidator(UpdateProjectConfigParams), this.update);
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const project = await this.projectsService.create(params);
            res.status(201).json(project);
        } catch (err) {
            next(err);
        }
    };

    readOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const projects = await this.projectsService.readOne(params);
            res.status(200).json(projects);
        } catch (err) {
            next(err);
        }
    };

    readAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const projects = await this.projectsService.readAll(params);
            res.status(200).json(projects);
        } catch (err) {
            next(err);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const updatedProject = await this.projectsService.update(params);
            res.status(200).json(updatedProject);
        } catch (err) {
            next(err);
        }
    };

    updateConfig = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const params = req.body;
            const updatedProject = await this.projectsService.updateConfig(params);
            res.status(200).json(updatedProject);
        } catch (err) {
            next(err);
        }
    }
}
