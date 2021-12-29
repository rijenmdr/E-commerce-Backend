const express = require('express');

const blogController = require('../controller/blog');
const blogCommentController = require('../controller/blogComment');

const router = express.Router();

router.post('/add-comment', blogCommentController.addComment)

router.post('/add', blogController.addBlog);

router.get('/get-blogs', blogController.getBlogs);

router.get('/get-blogs-tags', blogController.getBlogsByTag);

router.get('/get-blog-detail/:blogId', blogController.getBlogDetail);

module.exports = router;