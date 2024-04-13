import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (id) => {
    return jwt.sign({ user_Id:id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

// Compare password
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

// Hash password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
// generate 6 digit OTP
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}