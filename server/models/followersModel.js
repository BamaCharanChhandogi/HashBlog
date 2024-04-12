import mongoose from "mongoose";

const followersSchema = new mongoose.Schema({
    followerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    writerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
}, { timestamps: true });

export default mongoose.model("Followers", followersSchema);