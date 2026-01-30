

export enum UserRole {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    STAFF = 'STAFF',
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}


export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    status:UserStatus;
    invitedAt?: Date;
    createdAt:Date;
}