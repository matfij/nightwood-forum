import { Schema, model } from 'mongoose';
import { ProjectConfig, ProjectConfigBlock } from '../models/project-config';
import { PROJECT_CONFIG_DEFAULT } from '../data/project-config-default';

export const ProjectConfigSchema = new Schema<ProjectConfig>(
    {
        fontUrl: {
            type: String,
            default: PROJECT_CONFIG_DEFAULT.fontUrl,
        },
        fontFamily: {
            type: String,
            default: PROJECT_CONFIG_DEFAULT.fontFamily,
        },
        fontColor: {
            type: String,
            default: PROJECT_CONFIG_DEFAULT.fontColor,
        },
        backgroundColor: {
            type: String,
            default: PROJECT_CONFIG_DEFAULT.backgroundColor,
        },
        heading: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.heading,
        },
        paragraph: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.paragraph,
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
