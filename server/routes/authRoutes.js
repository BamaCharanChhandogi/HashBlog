import express from 'express';
import { googleSignup, login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login',login)
router.post('/register',register);
router.post('/google-signup',googleSignup);

export default router;
