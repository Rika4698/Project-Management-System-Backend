import express from 'express';
import { authorize, protect} from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { createProjectValidationSchema, updateProjectValidationSchema } from '../validations/project.validation';
import { projectController } from '../controllers/projectController';

const router = express.Router();

router.use(protect);

router.post('/', validateRequest(createProjectValidationSchema), projectController.createProject);

router.get('/', projectController.getProjects);

router.patch('/:id', authorize('ADMIN'), validateRequest(updateProjectValidationSchema), projectController.updateProject);

router.delete('/:id', authorize('ADMIN'), projectController.deleteProject);

export default router;