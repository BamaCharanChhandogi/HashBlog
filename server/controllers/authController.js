import User from "../models/userModel.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/index.js";
import { sendEmailVerification } from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      image,
      password,
      accountType,
      provider,
    } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return next("Please fill all the fields");
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return next("User already exists");
    }
    if (accountType == "writer" && !image) {
      return next("Please provide image");
    }
    // password
    const hashPasswords = await hashPassword(password);

    //add data to the database
    const newUser = await User.create({
      name: firstName + " " + lastName,
      email,
      image,
      password: !provider ? hashPasswords : "",
      accountType,
      provider,
    });

    // remove password from the output
    newUser.password = undefined;
    const token = generateToken(newUser?._id);
    if (accountType === "writer") {
      sendEmailVerification(newUser, res, token);
    } else {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        token,
        user: newUser,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};



// googleSignup
export const googleSignup = async (req, res, next) => {
  try {
    const { email, name, image, emailVerified } = req.body;
    if (!email || !name) {
      return next("Please provide email and name");
    }
    if (!emailVerified) {
      return next("Please verify your email");
    }
    const user = await User.findOne({ email });
    if (user) {
      return next("User already exists");
    }
    const newUser = await User.create({
      name,
      email,
      image,
      provider: "google",
      emailVerified,
    });
    newUser.password = undefined;
    const token = generateToken(newUser?._id);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next("Please provide email and password");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next("Invalid credentials");
    }
    const isMatch = await comparePassword(password, user?.password);
    if (!isMatch) {
      return next("Invalid credentials");
    }
    if (user?.accountType === "writer" && !user?.emailVerified) {
      return next("Please verify your email");
    }
    user.password = undefined;
    const token = generateToken(user?._id);
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};
