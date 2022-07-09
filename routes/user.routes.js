import express from 'express';
import { forgotPassword, getMe, login, logout, register, resetPassword } from '../controllers/auth.controller.js';
import { deserialize } from '../middleware/deserialize.js';
import { protect } from '../middleware/protect.js';

const router = express.Router();

router.use(deserialize)

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword/:token', resetPassword);

router.get('/me', protect, getMe)

export default router;