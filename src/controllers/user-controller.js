const UserService = require('../services/user-service');

class UserController {
    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
    }

    async create(req, res) {
        try {
            const response = await this.userService.create({
                email: req.body.email,
                password: req.body.password
            });

            return res.status(201).json({
                success: true,
                message: 'Successfully created a new user',
                data: response,
                err: {}
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something went wrong',
                data: {},
                success: false,
                err: error
            });
        }
    }
}

module.exports =new UserController();
