const BlogComment = require('../model/blogComment');
const Blog = require('../model/blog');
const Comment = require('../model/blogComment');

exports.addComment = async (req, res, next) => {
    const {
        name,
        email,
        commentBody,
        blogId
    } = req.body;

    try {
        const newBlogComment = new BlogComment({
            name,
            email,
            commentBody,
            blogId
        })

        await newBlogComment.save();

        const relatedBlog = await Blog.findById(blogId);

        relatedBlog.comment.push(newBlogComment);

        await relatedBlog.save();

        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Comment Added Successfully",
            comment: newBlogComment
        })
    }
    catch (err) {
        const error = new Error(err);
        next(error); 
    }
}

exports.getCommentById = async(req, res, next) => {
    const blogId = req.params.blogId;
    const limit = req.query.limit;

    try {
        const comments = await Comment.find({
            blogId
        }).limit(parseInt(limit)).sort({createdAt: -1});

        const commentCount = await Comment.find({
            blogId
        }).count()

        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Fetched Blog Comments Successfully",
            comments,
            totalComments: commentCount
        });

    } catch (err){
        const error = new Error(err);
        next(error); 
    }
}