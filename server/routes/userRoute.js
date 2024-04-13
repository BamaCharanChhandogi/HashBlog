import express from 'express';
import userAuth from '../middleware/authMiddleware.js';
import { OTPVerification, followWriter, getWriter, resendOTP, updateUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/verify/:userId/:otp', OTPVerification);
router.post('/resend-link/:id', resendOTP);

// user Routes
router.post('/follower/:id', userAuth,followWriter);
router.put('/update-user/:id', userAuth,updateUser);
router.get('/get-user/:id?', getWriter);

export default router;