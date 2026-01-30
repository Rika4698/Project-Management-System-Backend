import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from 'express';
import sendResponse from '../utils/sendResponse';
import { userService } from "../services/user.service";
import { AuthRequest } from "../middleware/auth";




// GET all users
 const getUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
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



// update user role
const updateUserRole = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { role } = req.body;
    const user = await userService.updateUserRoleService(req.params.id, role);

    // await createAuditLog(req.user!._id.toString(), AuditAction.UPDATE_USER_ROLE, `Updated user ${req.params.id} role to ${role}`, req);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User role updated successfully',
        data: user,
    });
});


export const userController = {
    getUsers,
    updateUserRole,
};