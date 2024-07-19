import { Router } from 'express';

import { loginController, signUpController } from './local.controller';
import processFileUploads from '../../middleware/uploads';

const router = Router();

router.post('/signup', processFileUploads, signUpController);
router.post('/login', loginController);

export default router;
