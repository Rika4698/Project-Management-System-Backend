import express from 'express';
import { userController } from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/', userController.getUsers);


export default router;
