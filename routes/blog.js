const express = require('express');

const blogController = require('../controller/blog');
const blogCommentController = require('../controller/blogComment');
const { commentValidation } = require('../validations/commentValidation');

const router = express.Router();

router.get('/get-blog-comment/:blogId', blogCommentController.getCommentById);

router.post('/add-comment', commentValidation, blogCommentController.addComment);

router.post('/add', blogController.addBlog);

router.get('/get-blogs', blogController.getBlogs);

router.get('/get-blogs-tags', blogController.getBlogsByTag);

router.get('/get-blog-detail/:blogId', blogController.getBlogDetail);

module.exports = router;