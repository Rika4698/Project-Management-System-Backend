import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import { AuthService } from "../services/auth.service";
import sendResponse from "../utils/sendResponse";
import { AuthRequest } from '../middleware/auth';


// login

const login = catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const {email, password} = req.body;
    const {refreshToken, accessToken, ...user} = await AuthService.loginService(email,password, req);

    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Login successful',
        data: { user, accessToken },
    });
});


// invite
const inviteUser = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { email, role } = req.body;
    const result = await AuthService.inviteUserService(email, role, req.user!._id.toString(), req);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Invite generated successfully',
        data: result,
    });
});




// register-via-invite
const registerViaInvite = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { token, name, password } = req.body;
    const { refreshToken, accessToken, ...user } = await AuthService.registerViaInviteService(token, name, password, req);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Registration successful',
        data: { user, accessToken },
    });
});

// refresh-token
const refreshToken = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const token = req.cookies?.refreshToken;
    const result = await AuthService.refreshTokenService(token);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Token refreshed successfully',
        data: result,
    });
})



export const authController = {
    login,
    inviteUser,
    registerViaInvite,
    refreshToken,
}