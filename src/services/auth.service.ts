import User from "../models/User";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import AppError from "../utils/AppError";
import { UserRole, UserStatus } from "../interfaces/user.interface";
import { generateRefreshToken, generateToken } from "../utils/token.utils";
import { AuditAction } from "../models/AuditLog";
import { createAuditLog } from "../utils/audit";
import Invite from "../models/Invite";




 const loginService = async (email:string, password:string, req?:any) => {
    const user = await User.findOne({email}).select('+password');

    if(!user || !(await bcrypt.compare(password, user.password || ""))){
        throw new AppError(401, 'Invalid email or password');
    }

    if(user.status === UserStatus.INACTIVE){
        throw new AppError(403, 'User is deactivated');
    }

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // await createAuditLog(user._id.toString(), AuditAction.LOGIN, `User logged in from IP: ${req?.ip}`, req);

    return{
      _id:user._id,
      name:user.name,
      email:user.email,
      role:user.role,
      accessToken,
      refreshToken,
    };
};



const inviteUserService = async (email: string, role: UserRole, adminId: string, req?: any) => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new AppError(400, 'User already exists');
    }


     const activeInvite = await Invite.findOne({
    email,
    acceptedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (activeInvite) {
    throw new AppError(400, 'Active invite already exists');
  }

  if (!Object.values(UserRole).includes(role)) {
    throw new AppError(400, 'Invalid role');
  }

    const token = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); 

    await Invite.create({
        email,
        role,
        token,
        expiresAt,
    });

    const inviteLink = `${process.env.FRONTEND_URL}/register?token=${token}`;

    // await createAuditLog(adminId, AuditAction.INVITE_USER, `Invited user ${email} with role ${role}. Link: ${inviteLink}`, req);

    return {
        inviteToken: token,
        inviteLink,
        email: email,
    };
};




 const registerViaInviteService = async (token: string, name: string, password: string, req?: any) => {
    const invite = await Invite.findOne({ token, expiresAt: { $gt: new Date() }, acceptedAt: null });

    if (!invite) {
        throw new AppError(400, 'Invalid or expired invite token');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        status: UserStatus.ACTIVE,
        invitedAt: new Date(),
    });

    invite.acceptedAt = new Date();
    await invite.save();

    const accessToken = generateToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // await createAuditLog(user._id.toString(), AuditAction.REGISTER_VIA_INVITE, 'User registered via invite', req);

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
    };
};



export const AuthService = {
    loginService,
    inviteUserService,
    registerViaInviteService
};