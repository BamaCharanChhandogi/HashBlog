import Posts from '../models/postModel.js';
import Comments from '../models/commentModel.js';

// Get Post route
export const getPosts = async (req, res) => {
    try {
        const { cat, writerId } = req.query;
    
        let query = { status: true };
    
        if (cat) {
          query.cat = cat;
        } else if (writerId) {
          query.user = writerId;
        }
    
        let queryResult = Posts.find(query)
          .populate({
            path: "user",
            select: "name image -password",
          })
          .sort({ _id: -1 });
        console.log(queryResult);
        // pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1) * limit;
    
        //records count
        const totalPost = await Posts.countDocuments(queryResult);
    
        const numOfPage = Math.ceil(totalPost / limit);
    
        queryResult = queryResult.skip(skip).limit(limit);
    
        const posts = await queryResult;
    
        res.status(200).json({
          success: true,
          totalPost,
          data: posts,
          page,
          numOfPage,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}
export const getPopularContents = async (req, res) => {
    try {
        const posts = await Posts.aggregate([
          {
            $match: {
              status: true,
            },
          },
          {
            $project: {
              title: 1,
              slug: 1,
              img: 1,
              cat: 1,
              views: { $size: "$views" },
              createdAt: 1,
            },
          },
          {
            $sort: { views: -1 },
          },
          {
            $limit: 5,
          },
        ]);
    
        const writers = await Users.aggregate([
          {
            $match: {
              accountType: { $ne: "User" },
            },
          },
          {
            $project: {
              name: 1,
              image: 1,
              followers: { $size: "$followers" },
            },
          },
          {
            $sort: { followers: -1 },
          },
          {
            $limit: 5,
          },
        ]);
    
        res.status(200).json({
          success: true,
          message: "Successful",
          data: { posts, writers },
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}
export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
    
        const post = await Posts.findById(postId).populate({
          path: "user",
          select: "name image -password",
        });
    
        const newView = await Views.create({
          user: post?.user,
          post: postId,
        });
    
        post.views.push(newView?._id);
    
        await Posts.findByIdAndUpdate(postId, post);
    
        res.status(200).json({
          success: true,
          message: "Successful",
          data: post,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}
export const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
    
        const postComments = await Comments.find({ post: postId })
          .populate({
            path: "user",
            select: "name image -password",
          })
          .sort({ _id: -1 });
    
        res.status(200).json({
          sucess: true,
          message: "successfully",
          data: postComments,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}

// Update post Route
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        const post = await Posts.findByIdAndUpdate(id, { status }, { new: true });
    
        res.status(200).json({
          sucess: true,
          message: "Action performed successfully",
          data: post,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}

// Delete post Route
export const deletePost = async (req, res) => {
    try {
        const { userId } = req.body.user;
        const { id } = req.params;
    
        await Posts.findOneAndDelete({ _id: id, user: userId });
    
        res.status(200).json({
          success: true,
          message: "Deleted successfully",
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}
export const deleteComment = async (req, res) => {
    try {
        const { id, postId } = req.params;
    
        await Comments.findByIdAndDelete(id);
    
        //removing commetn id from post
        const result = await Posts.updateOne(
          { _id: postId },
          { $pull: { comments: id } }
        );
    
        if (result.modifiedCount > 0) {
          res
            .status(200)
            .json({ success: true, message: "Comment removed successfully" });
        } else {
          res.status(404).json({ message: "Post or comment not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}

// Like and comment on post
export const commentPost = async (req, res) => {
    try {
        const { desc } = req.body;
        const { userId } = req.body.user;
        const { id } = req.params;
    
        if (desc === null) {
          return res.status(404).json({ message: "Comment is required." });
        }
    
        const newComment = new Comments({ desc, user: userId, post: id });
    
        await newComment.save();
    
        //updating the post with the comments id
        const post = await Posts.findById(id);
    
        post.comments.push(newComment._id);
    
        await Posts.findByIdAndUpdate(id, post, {
          new: true,
        });
    
        res.status(201).json({
          success: true,
          message: "Comment published successfully",
          newComment,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}
// admin routes
export const stats = async (req, res) => {

}
export const getFollowers = async (req, res) => {

}
export const getPostContent = async (req, res) => {

}
export const createPost = async (req, res) => {
    try {
        const { userId } = req.body.user;
        const { desc, img, title, slug, cat } = req.body;
    
        if (!(desc || img || title || cat)) {
          return next(
            "All fields are required. Please enter a description, title, category and select image."
          );
        }
    
        const post = await Posts.create({
          user: userId,
          desc,
          img,
          title,
          slug,
          cat,
        });
    
        res.status(200).json({
          success: true,
          message: "Post created successfully",
          data: post,
        });
      } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
      }
}

