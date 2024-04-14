import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateOTP, hashPassword } from "./index.js";
import EmailVerification from "../models/emailVerification.js";


dotenv.config();
// const { AUTH_EMAIL, AUTH_PASSWORD } = process.env;

const AUTH_EMAIL = 'rrpb2580@gmail.comvxz';
const AUTH_PASSWORD = 'wodd lixq etjc haqe';

console.log(AUTH_EMAIL, AUTH_PASSWORD);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: AUTH_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

export const sendEmailVerification = async (user, res, token) => {
  console.log(AUTH_EMAIL, AUTH_PASSWORD);
  const { _id, email, name } = user;
  const otp = generateOTP();

  // mail option
  const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<div style="font-family: Arial, sans-serif; font-size: 20px; color: #333; background-color: #f7f7f7; padding: 20px; border-radius: 5px; max-width: 600px; margin: 0 auto;">
    <h3 style="color: rgb(8, 56, 188); text-align: center; margin-bottom: 20px;">Please verify your email address</h3>
    <hr style="border: none; height: 1px; background-color: #ccc; margin: 20px 0;">
    <h4 style="margin-bottom: 10px;">Hi, ${name},</h4>
    <p style="margin-bottom: 20px;">
      Please verify your email address with the OTP. <br>
      <h1 style="font-size: 32px; color: rgb(8, 56, 188); text-align: center; margin: 20px 0;">
        ${otp}
      </h1>
      <p style="margin-bottom: 0;">This OTP <b>expires in 2 mins</b></p>
    </p>
    <div style="margin-top: 20px; text-align: center;">
      <h5 style="margin-bottom: 5px;">Regards</h5>
      <h5 style="margin: 0;">Bama Charan Chhandogi</h5>
    </div>
  </div>`,
  };
  try {
    const OTPHashToken = await hashPassword(String(otp));
    const newVerifiedEmail = EmailVerification.create({
      userId: _id,
      token: OTPHashToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 120000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "pending",
            message:
              "OTP has been sent to your account. Check your email and verify your email.",
            token,
            user,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "something went wrong" });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
