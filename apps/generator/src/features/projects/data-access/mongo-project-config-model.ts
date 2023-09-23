import { Schema, model } from 'mongoose';
import { ProjectConfig } from '../models/project-config';
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
        divider: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.divider,
        },
        callout: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.callout,
        },
        listItem: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.listItem,
        },
        todoItem: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.todoItem,
        },
        image: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.image,
        },
        file: {
            type: Object,
            default: PROJECT_CONFIG_DEFAULT.file,
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
