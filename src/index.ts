import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/ErrorHandler';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';


dotenv.config();

connectDB();

const app = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);



app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use(notFound);
app.use(errorHandler);

// Database connection on startup
connectDB().then(() => {
  console.log(" Database connected");
}).catch((error) => {
  console.error(" Database connection failed:", error);
  process.exit(1);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
