import express from 'express';
import authRoutes from './authRoutes.js';
import userRoute from './userRoute.js';
import postRoute from './postRoute.js';
const router = express.Router();

router.use("/auth",authRoutes);
router.use("/user",userRoute);
router.use("/auth",postRoute);
export default router;

