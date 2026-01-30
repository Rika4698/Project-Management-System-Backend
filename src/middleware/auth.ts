import { Request, Response, NextFunction } from 'express';
import { IUser } from "../interfaces/user.interface";
import User from '../models/User';
import { verifyToken } from '../utils/token.utils';


export interface AuthRequest extends Request {
    user?: IUser;
}


export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decoded: any = verifyToken(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.status === 'INACTIVE') {
            return res.status(403).json({ message: 'User is deactivated' });
        }

        req.user = user;
        next();
    } catch {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role ${req.user?.role} is not authorized to access this route` });
        }
        next();
    };
};