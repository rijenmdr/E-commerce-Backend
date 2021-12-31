const Tag = require('../model/tag');

exports.addNewTag = async (req, res, next) => {
    const { name } = req.body;

    try {
        const tag = await Tag.findOne({ name });
        if (tag) {
            console.log("Already Exists");
            return res.status(409).json({
                status: 409,
                statusMessage: "Fail",
                message: "Tag Already Exists"
            })
        }
        const newTag = new Tag({
            name
        })
        await newTag.save();
        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Tag Created Successfully"
        })
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}