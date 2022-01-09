const Category = require('../model/category');

exports.addNewCategory = async (req, res, next) => {
    const { name } = req.body;

    try {
        const category = await Category.findOne({ name });
        if (category) {
            console.log("Already Exists");
            return res.status(409).json({
                status: 409,
                statusMessage: "Fail",
                message: "Category Already Exists"
            })
        }
        const newCategory = new Category({
            name
        })
        await newCategory.save();
        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Category Created Successfully"
        })
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}

exports.getCategories = async(req, res, next) => {
    try {
        const categories = await Category.find();

        res.status(201).json({
            status: 201,
            statusMessage:"success",
            message: "Categories fetched Successfully",
            categories
        })
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}