import express from 'express';
import AuthService from '../service/AuthService.js';

const router = express.Router();

import userRouter from '../controller/user/index.js';
import adminRouter from '../controller/admin/index.js';
import publicRouter from '../controller/public/index.js';

router.use('/user', AuthService.verifyRequest, userRouter);
router.use('/admin', AuthService.verifyRequest, AuthService.hasRole(['admin']), adminRouter);
router.use('/public', publicRouter);

export default router;
