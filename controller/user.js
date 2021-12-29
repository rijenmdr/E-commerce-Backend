const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        mobileNo,
        country,
        city,
        street,
        dob
    } = req.body

    console.log(req.body)

    const name = `${firstName.trim()} ${lastName.trim()}`

    try {
        const user = await User.findOne({ email })
        if (user) {
            console.log("User Already exists")
            res.status(409).json({
                status: 409,
                statusMessage: "Fail",
                message: "User Already Exists"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                mobileNo,
                address: {
                    country,
                    city,
                    street
                },
                dob,
                role: 3,
                isVerified: false
            })

            await newUser.save();

            res.status(201).json({
                status: 201,
                message: "User Registed Successfully",
                name,
                email
            })
        }
    }
    catch (err) {
        console.log(err)
    }
}