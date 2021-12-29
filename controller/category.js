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
        console.log(err)
    }
}