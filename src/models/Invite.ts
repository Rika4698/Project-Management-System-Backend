import mongoose, { Schema, Document } from 'mongoose';
import { UserRole } from '../interfaces/user.interface';

export interface IInvite extends Document {
    email: string;
    role: UserRole;
    token: string;
    expiresAt: Date;
    acceptedAt?: Date;
}

const InviteSchema: Schema = new Schema({
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: { type: Date },
});

export default mongoose.model<IInvite>('Invite', InviteSchema);
