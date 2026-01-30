import express from 'express';
import { userController } from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { updateUserRoleValidationSchema } from '../validations/user.validation';

const router = express.Router();

router.use(protect);
router.use(authorize('ADMIN'));

router.get('/', userController.getUsers);

router.patch('/:id/role', validateRequest(updateUserRoleValidationSchema), userController.updateUserRole);


export default router;
