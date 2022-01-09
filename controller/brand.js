const Brand = require('../model/brand');

exports.addNewBrand = async (req, res, next) => {
    const { name, categoryId } = req.body;

    try {
        const brand = await Brand.findOne({ name });
        if (brand) {
            console.log("Already Exists");
            return res.status(409).json({
                status: 409,
                statusMessage: "Fail",
                message: "Brand Already Exists"
            })
        }
        const newBrand = new Brand({
            name,
            categoryId
        })
        await newBrand.save();
        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Brand Created Successfully"
        })
    } catch (err) {
        const error = new Error(err);
        next(error); 
    }
}