import express from 'express'
import userAuth from '../middleware/authMiddleware.js';
import { commentPost, createPost, deleteComment, deletePost, getComments, getFollowers, getPopularContents, getPost, getPostContent, getPosts, stats, updatePost } from '../controllers/postController.js';

const router = express.Router();

// Get Post route
router.get('/',getPosts);
router.get('/popular',getPopularContents);
router.get('/:postId',getPost);
router.get("/comments/:postId", getComments);
// Update post Route
router.patch('/update/:id',userAuth,updatePost);
// Delete post Route
router.delete('/:id',userAuth,deletePost);
router.delete("/comment/:id/:postId", userAuth, deleteComment);
// Like and comment on post
router.post('/comment/:id',userAuth,commentPost)
// admin routes
router.post("/admin-analytics", userAuth, stats);
router.post("/admin-followers", userAuth, getFollowers);
router.post("/admin-content", userAuth, getPostContent);
router.post("/create-post", userAuth, createPost);

export default router;
