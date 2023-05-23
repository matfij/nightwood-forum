import { Schema, Types, model } from 'mongoose';

export interface Project {
    id?: string;
    userId: string;
    notionId: string;
    notionName: string;
    notionAccessCode: string;
    createdAt?: number;
}

const ProjectSchema = new Schema<Project>(
    {
        id: String,
        userId: String,
        notionId: String,
        notionName: String,
        notionAccessCode: String,
        createdAt: {
            type: Number,
            default: () => Date.now(),
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

ProjectSchema.pre('save', function (next) {
    this.id = new Types.ObjectId().toHexString();
    this.notionId = this.notionId?.replace(/\-/g, '');
    next();
});

export const ProjectModel = model<Project>('Project', ProjectSchema);
