import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    desc: {
        type: String,
        max: 500,
    },
    img: {
        type: String,
    },
    views:[{
        type:Schema.Types.ObjectId,
        ref:"Views"
    }],
    likes: {
        type: Array,
        default: [],
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],
    status:{
        type:Boolean,
        default:true
    }
}, { timestamps: true });

export default mongoose.model("Posts", postSchema);