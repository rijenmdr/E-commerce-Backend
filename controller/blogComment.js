const BlogComment = require('../model/blogComment');
const Blog = require('../model/blog');

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
            message: "Comment Added Successfully"
        })
    }
    catch (err) {
        console.log(err)
    }
}