import express from 'express';
import { authController} from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { inviteValidationSchema, loginValidationSchema, registerViaInviteValidationSchema } from '../validations/auth.validation';
import { authorize, protect } from '../middleware/auth';


const router = express.Router();

router.post('/login', validateRequest(loginValidationSchema), authController.login);


router.post('/invite', protect, authorize('ADMIN'), validateRequest(inviteValidationSchema), authController.inviteUser);

router.post('/register-via-invite', validateRequest(registerViaInviteValidationSchema), authController.registerViaInvite);
router.post('/refresh-token', authController.refreshToken);



export default router;
