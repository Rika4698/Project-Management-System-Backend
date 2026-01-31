import mongoose, { Schema } from 'mongoose';
import { IProject, ProjectStatus } from '../interfaces/project.interface';

const ProjectSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        status: { type: String, enum: Object.values(ProjectStatus), default: ProjectStatus.ACTIVE },
        isDeleted: { type: Boolean, default: false },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
