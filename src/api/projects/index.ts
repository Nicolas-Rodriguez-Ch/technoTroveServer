import { Router } from 'express';

import { auth } from '../../middleware/auth';
import {
  createProjectController,
  deleteProjectController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectController,
} from './projects.controller';
import processFileUploads from '../../middleware/uploads';

const router = Router();

router.get('/', getAllProjectsController);
router.get('/:id', getProjectByIdController);
router.post('/', auth, processFileUploads, createProjectController);
router.put('/:id', auth, processFileUploads, updateProjectController);
router.patch('/:id', auth, deleteProjectController);

export default router;
