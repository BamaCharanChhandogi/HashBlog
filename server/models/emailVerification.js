import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema({
    userId: String,
    token: String,
    createdAt: Date,
    expiresAt: Date,
});

export default mongoose.model("EmailVerification", emailVerificationSchema);