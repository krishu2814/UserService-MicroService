const validateUser = (req, res, next) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong and go to validateUser.',
            err: 'Email or password missing in the request'
        })
    }
    next();
}

const validateAdminRequest = (req, res, next) => {
    if (!req.body.id) {
        return res.status(400).json({
            sucess: false,
            data: {},
            err: 'user id not given in req.body.',
            message: 'Something went wrong in middleware.'
        })
    }
    next();
}

module.exports = {
    validateUser,
    validateAdminRequest
}
