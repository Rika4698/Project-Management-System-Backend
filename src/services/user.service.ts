import User from '../models/User';
import AppError from '../utils/AppError';



const getUsersService = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
        User.find().sort('-createdAt').skip(skip).limit(limit),
        User.countDocuments(),
    ]);

    return {
        users,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};



 const updateUserRoleService = async (id: string, role: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new AppError(404, 'User not found');
    }

    user.role = role as any;
    await user.save();

    return user;
};



export const userService = {
          getUsersService,
          updateUserRoleService
};



