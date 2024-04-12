import mongoose, { Types } from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);