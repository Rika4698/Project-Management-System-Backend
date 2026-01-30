import mongoose, { Schema } from "mongoose";
import { IUser, UserRole, UserStatus } from "../interfaces/user.interface";



const UserSchema : Schema = new Schema(
    {
        name:{ type:String, required: true},
        email:{type:String, required: true, unique:true},
        password: {type:String, select:false},
        role:{type:String, enum:Object.values(UserRole), default:UserRole.STAFF},
        status:{type:String, enum:Object.values(UserStatus), default:UserStatus.ACTIVE},
        invitedAt:{type:Date},
    },
    {timestamps:true}
);

export default mongoose.model<IUser>('User',UserSchema);