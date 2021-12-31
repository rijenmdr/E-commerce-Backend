const { check } =  require("express-validator");

exports.emailValidation = () => {
    return  check('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address!')
}

exports.nameValidation = () => {
    return  check('name')
    .trim()
    .escape()
    .isLength({min: 2})
    .withMessage('Name must be atleast length of 2!')
}