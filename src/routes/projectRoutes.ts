import express from 'express';
import { protect} from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { createProjectValidationSchema } from '../validations/project.validation';
import { projectController } from '../controllers/projectController';

const router = express.Router();

router.use(protect);

router.post('/', validateRequest(createProjectValidationSchema), projectController.createProject);


export default router;