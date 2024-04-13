import EmailVerification from "../models/emailVerification.js";
import followersModel from "../models/followersModel.js";
import Users from "../models/userModel.js";
import { comparePassword } from "../utils/index.js";
import { sendEmailVerification } from "../utils/sendEmail.js";

export const OTPVerification = async (req, res, next) => {
  try {
    const { userId, otp } = req.params;
    const verifyUser = EmailVerification.findOne(userId);

    const { expiresAt, token } = verifyUser;

    if (expiresAt < new Date()) {
      await EmailVerification.findOneAndDelete(userId);
      return res.status(404).json({ message: "OTP expired" });
    } else {
      const isMatch = await comparePassword(otp, token);
      if (isMatch) {
        await Promise.all([
          User.findByIdAndUpdate({ _id: userId }, { emailVerified: true }),
          EmailVerification.findOneAndDelete(userId),
        ]);
        return res.status(200).json({ message: "OTP verified successfully" });
      } else {
        return res.status(404).json({ message: "OTP is incorrect" });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "something went wrong" });
  }
};
export const resendOTP = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await EmailVerification.findOneAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = undefined;

    const token = createJWT(user?._id);
    if (user.accountType === "writer") {
      sendEmailVerification(user, res, token);
      return res.status(200).json({ message: "OTP sent successfully" });
    } else {
      return res.status(404).json({ message: "User is not a writer" });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "something went wrong" });
  }
};
export const followWriter = async (req, res, next) => {
  try {
    const followerId = req.body.user.userId;
    const { id } = req.params;

    const checks = await followersModel.findOne({ followerId });

    if (checks)
      return res.status(201).json({
        success: false,
        message: "You're already following this writer.",
      });

    const writer = await Users.findById(id);

    const newFollower = await followersModel.create({
      followerId,
      writerId: id,
    });

    writer?.followers?.push(newFollower?._id);

    await Users.findByIdAndUpdate(id, writer, { new: true });

    res.status(201).json({
      success: true,
      message: "You're now following writer " + writer?.name,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { firstName, lastName, image } = req.body;
    const updateUser = {
      name: firstName + " " + lastName,
      image,
      _id: userId,
    };

    const user = await Users.findByIdAndUpdate(userId, updateUser, {
      new: true,
    });

    const token = createJWT(user?._id);

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getWriter = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const user = await Users.findById(id).populate({
          path: "followers",
          select: "followerId",
        });
    
        if (!user) {
          return res.status(200).send({
            success: false,
            message: "Writer Not Found",
          });
        }
    
        user.password = undefined;
    
        res.status(200).json({
          success: true,
          data: user,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" });
      }
};
