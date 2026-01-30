import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from "../services/user.service";




// GET all users
 const getUsers = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = await userService.getUsersService(page, limit);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        meta: result.meta,
        data: result.users,
    });
});


export const userController = {
    getUsers
};