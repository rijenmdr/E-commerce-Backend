const Blog = require('../model/blog');
const User = require('../model/user');

//Add Blog

exports.addBlog = async (req, res, next) => {
    const {
        title,
        authorId,
        coverImg,
        previewImg,
        description,
        categoryId,
        tags
    } = req.body;

    try {
        const newBlog = new Blog({
            title,
            authorId,
            coverImg,
            previewImg,
            description,
            categoryId,
            tags
        })

        await newBlog.save();

        const user = await User.findById(authorId);

        user.blogs.push(newBlog);

        await user.save();

        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Blog Created Successfully"
        })
    } catch (e) {
        const error = new Error(e);
        next(error);
    }
}

exports.getBlogs = async (req, res, next) => {
    const page = req.query.page;
    const category = req.query.categoryId
    const archive = req.query.archive

    let skip = (page - 1) * 9;
    const limit = 9;
    let query = '', start, end;

    if (archive) {
        const [month, year] = archive.split("-");
        start = new Date(year, month, -29);
        end = new Date(year, month, 1);
    }

    if (category && archive) {
        query = { "$and": [{ "categoryId": category }, { "createdAt": { "$gte": start, "$lt": end } }] }
    } else if (category) {
        query = { "categoryId": category }
    } else if (archive) {
        query = { "createdAt": { "$gte": start, "$lt": end } }
    } else {
        query = {}
    }

    console.log("query", query)

    try {
        const blogs = await Blog.find(query, {
            _id: 1,
            title: 1,
            previewImg: 1,
            createdAt: 1,
            authorId: 1,
            categoryId: 1,
        }).populate("authorId", "name").populate("categoryId").skip(skip).limit(limit);
        const blogCount = await Blog.find(query).count();

        if (blogs) {
            res.status(201).json({
                status: 201,
                statusMessage: "Success",
                message: "Blog fetched Successfully",
                blogs,
                blogCount: blogCount
            })
        }
    } catch (err) {
       const error = new Error(err);
       next(error); 
    }
}

exports.getBlogsByTag = async (req, res, next) => {
    const page = req.query.page;
    const tag = req.query.tagId

    let skip = (page - 1) * 9;
    const limit = 9;
    const query = { "tags": { $in: [tag] } }

    try {
        const blogs = await Blog.find(query, {
            _id: 1,
            title: 1,
            previewImg: 1,
            createdAt: 1,
            authorId: 1
        }).populate("authorId", "name").skip(skip).limit(limit);
        const blogCount = await Blog.find(query).count();

        if (blogs) {
            res.status(201).json({
                status: 201,
                statusMessage: "Success",
                message: "Blog fetched Successfully",
                blogs,
                blogCount: blogCount
            })
        }
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}

exports.getBlogDetail = async (req, res, next) => {
    const blogId = req.params.blogId;
    const limit = 4

    try {
        const blog = await Blog.findOne({ _id: blogId }).populate('authorId', "name").populate("categoryId").populate("tags").populate("comment");
        const relatedBlogs = await Blog.find(
            {
                "categoryId": blog.categoryId
            },
            {
                _id: 1,
                title: 1,
                previewImg: 1,
                createdAt: 1,
            }).populate('authorId', "name").populate("categoryId").limit(limit)
        if (blog && relatedBlogs) {
            res.status(201).json({
                status: 201,
                statusMessage: "Success",
                message: "Blog fetched Successfully",
                blog,
                relatedBlogs
            })
        }
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}