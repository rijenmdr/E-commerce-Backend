const {check,validationResult} = require('express-validator');
const { emailValidation, nameValidation } = require('./componentValidation');

exports.commentValidation = [
    emailValidation(),
    nameValidation(),
    check('commentBody')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Comment cannot be empty"),
    check('blogId')
    .not()
    .isEmpty()
    .withMessage("Blog Id cannot be empty"),
    (req,res,next) =>{  
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({
                status:"fail",
                error:error.array()
            });
        }
        next()
    }
]