import mongoose, { Schema, Document } from 'mongoose';

export enum AuditAction {
    LOGIN = 'LOGIN',
    INVITE_USER = 'INVITE_USER',
    REGISTER_VIA_INVITE = 'REGISTER_VIA_INVITE',
    UPDATE_USER_ROLE = 'UPDATE_USER_ROLE',
    UPDATE_USER_STATUS = 'UPDATE_USER_STATUS',
    CREATE_PROJECT = 'CREATE_PROJECT',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
}

export interface IAuditLog extends Document {
    user: mongoose.Types.ObjectId;
    action: AuditAction;
    details: string;
    ipAddress?: string;
    userAgent?: string;
    createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        action: { type: String, enum: Object.values(AuditAction), required: true },
        details: { type: String, required: true },
        ipAddress: { type: String },
        userAgent: { type: String },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
