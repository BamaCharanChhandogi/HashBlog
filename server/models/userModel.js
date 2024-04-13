import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 6,
      max: 255,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    accountType:{
      type:String,
      default:'User'
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    provider:{
      type:String,
      default:'rrpb2580'
    },
    image: {
      type: String,
    },
    followers:[
        {type:Schema.Types.ObjectId, ref:'Followers'}
    ]
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
