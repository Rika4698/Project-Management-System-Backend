import mongoose, { Document } from 'mongoose';

export enum ProjectStatus {
    ACTIVE = 'ACTIVE',
    ARCHIVED = 'ARCHIVED',
    DELETED = 'DELETED',
}

export interface IProject extends Document {
    name: string;
    description: string;
    status: ProjectStatus;
    isDeleted: boolean;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}