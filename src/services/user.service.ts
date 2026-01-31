import User from '../models/User';
import AppError from '../utils/AppError';



const getUsersService = async (page = 1, limit = 10, search = '') => {
    const skip = (page - 1) * limit;

    const query: any = {};
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
        ];
    }

    const [users, total] = await Promise.all([
        User.find(query).sort('-createdAt').skip(skip).limit(limit),
        User.countDocuments(query),
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


const updateUserStatusService = async (id: string, status: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new AppError(404, 'User not found');
    }

    user.status = status as any;
    await user.save();

    return user;
};

export const userService = {
          getUsersService,
          updateUserRoleService,
          updateUserStatusService,
};



