import dotenv from 'dotenv';
import connectDB from "./config/db";
import { UserRole, UserStatus } from "./interfaces/user.interface";
import User from "./models/User";
import bcrypt from 'bcryptjs';

dotenv.config();

const createAdmin = async () => {
    try{
        await connectDB();
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';

        console.log(adminEmail,"hh");
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
         console.log(adminPassword,"dg");
        const adminExists = await User.findOne({email: adminEmail});

        if(adminExists) {
            console.log('Admin already exists');
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
            name:'Admin',
            email:adminEmail,
            password:hashedPassword,
            role:UserRole.ADMIN,
            status:UserStatus.ACTIVE,
        });

        console.log('Admin user created successfully');
        process.exit(0);

        
    } catch (error) {
        if(error instanceof Error){
            console.log(`Error: ${error.message}`);
        }
        process.exit(1);
    }
};

createAdmin();