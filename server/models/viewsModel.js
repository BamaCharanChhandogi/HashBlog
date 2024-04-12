import mongoose from "mongoose";

const viewsSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
    },
}, { timestamps: true });

export default mongoose.model("Views", viewsSchema);