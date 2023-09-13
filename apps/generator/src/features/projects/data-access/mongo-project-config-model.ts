import { Schema, model } from 'mongoose';
import { ProjectConfig, ProjectConfigBlock } from '../models/project-config';
import { ProjectConfigDefault } from '../data/project-config-default';

export const ProjectConfigSchema = new Schema<ProjectConfig>(
    {
        fontUrl: {
            type: String,
            default: ProjectConfigDefault.fontUrl,
        },
        fontFamily: {
            type: String,
            default: ProjectConfigDefault.fontFamily,
        },
        fontColor: {
            type: String,
            default: ProjectConfigDefault.fontColor,
        },
        backgroundColor: {
            type: String,
            default: ProjectConfigDefault.backgroundColor,
        },
        heading: {
            type: Object,
            default: ProjectConfigDefault.heading,
        },
        paragraph: {
            type: Object,
            default: ProjectConfigDefault.paragraph,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    },
);

export const ProjectConfigModel = model<ProjectConfig>('ProjectConfig', ProjectConfigSchema);
