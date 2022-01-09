const User = require('../model/user');
const bcrypt = require('bcrypt');
const Merchant = require('../model/merchant');

exports.registerUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password,
        mobileNo,
        gender,
        country,
        city,
        role,
        street,
        dob
    } = req.body

    const roleId = role === 1 ? 3 : role;
    let name;

    if(roleId === 3) {
        name = `${firstName.trim()} ${lastName.trim()}`;
    } else {
        name = `${firstName.trim()}`
    }

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
                gender,
                address: {
                    country,
                    city,
                    street
                },
                dob,
                role: roleId,
                isVerified: false
            })

            const user = await newUser.save();

            if(roleId === 2) {
                const merchantUser= new Merchant({
                    userId: user._id
                })
                await merchantUser.save();
            }

            res.status(201).json({
                status: 201,
                message: "User Registed Successfully",
                name,
                email
            })
        }
    }
    catch (err) {
        const error = new Error(err);
        next(error); 
    }
}