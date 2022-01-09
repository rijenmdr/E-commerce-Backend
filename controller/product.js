const Product = require('../model/product');
const Merchant = require('../model/merchant');

exports.addProduct = async (req, res, next) => {
    const {
        productId,
        name,
        productImages,
        previewImg,
        shortDescription,
        actualPrice,
        description,
        categoryId,
        brandId,
        onStock,
        soldIn,
        serviceType,
        extraInformation,
        numberForDelivery,
        timeForDelivery,
        shippingCost
    } = req.body;

    const merchantId = '61d7d52e976f14479e3a33d6'

    try {
        const newProduct = new Product({
            productId,
            name,
            merchantId,
            productImages,
            previewImg,
            shortDescription,
            actualPrice,
            description,
            categoryId,
            brandId,
            onStock,
            soldIn,
            serviceType,
            extraInformation,
            deliveryIn: {
                numberForDelivery,
                timeForDelivery
            },
            shippingCost
        })

        await newProduct.save();

        const user = await Merchant.findOne({
            userId: merchantId
        });

        user.products.push(newProduct);

        await user.save();

        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Product Created Successfully"
        })
    } catch (e) {
        const error = new Error(e);
        next(error);
    }
}


exports.getProducts = async(req, res, next) => {
    const search = req.query.search;
    const categoryId = req.query.categoryId;
    const service = req.query.service;
    const rating = req.query.rating;
    const min = req.query.min;
    const max= req.query.max;
    const page = req.query.page;
    const sort = req.query.sortBy;

    let skip = (page - 1) * 9;
    const limit = 9;
    let sortBy, serviceData;
    let brands = [];

    if(service) {
        serviceData = service.split("-")
    }

    console.log(min,max)

    let query = {}

    if(search) {query.name =  {"$regex": `${search}`, "$options": "i"}}

    if(categoryId) { query.categoryId = categoryId }

    if(serviceData) {
        serviceData.length === 1 ?
            query.serviceType = serviceData :
            query.serviceType = "b"
    }

    if(rating) {
        query.averageRating = {"$gte": rating}
    }

    if(min) {
        query.actualPrice = {"$gte": min}
    }

    if(max) {
        query.actualPrice = {"$lte": max}
    }

    if (min && max) {
        query.actualPrice = {"$gte": min,"$lte": max}
    }

    // filter = search && categoryId ? 
    //             { "$and":[{"categoryId":categoryId}, {"name": {"$regex": `${search}`, "$options": "i"}}]} :
    //             categoryId ?
    //                 {"categoryId":categoryId} :
    //             search ? 
    //                 {"name": {"$regex": `${search}`, "$options": "i"}} :
    //                 {}

    console.log(query)

    const [field, order] = sort.split('|');

    if(field === "date") {
        sortBy = {createdAt: order}
    } else {
        sortBy = {actualPrice: order}
    }


    try {
        const products = await Product.find(query)
                            .populate("brandId")
                            .skip(skip)
                            .limit(limit)
                            .sort(sortBy);
        const totalProducts = await Product.find(query).count();

        // if(Object.keys(query).length!==0) {
        //     brands = products.map(product=>product?.brandId)
        //                 .filter((value, index, self)=> self.indexOf(value) === index);
        // }

        res.status(201).json({
            status: 201,
            statusMessage: "Success",
            message: "Blog fetched Successfully",
            products,
            totalProducts,
            // brands
        })
    } 
    catch (err) {
        const error = new Error(err);
        next(error);
    }
}