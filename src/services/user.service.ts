import User from '../models/User';



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


export const userService = {
          getUsersService,
};



