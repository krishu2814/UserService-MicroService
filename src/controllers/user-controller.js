const UserService = require('../services/user-service');

class UserController {
    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
        this.destroy = this.destroy.bind(this);
        this.get = this.get.bind(this);
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
                message: 'Something went wrong in controllers.',
                data: {},
                success: false,
                err: error
            });
        }
    }

    async destroy(req, res) {
        try {
            const user = await this.userService.destroy({
                where: {
                    id: req.params.id, // user/3
                },
            })
            res.status(201).json({
                success: true,
                message: 'Successfully deleted the user',
                data: user,
                err: {}
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Something went wrong in contollers.',
                data: {},
                success: false,
                err: error
            });
        }
    }

    async get(req, res) {
        try {
            const user = await this.userService.get(req.params.id); 
            console.log(user);
            if (!user) {
                throw error;
            }
            res.status(200).json({
                success: true,
                message: 'Successfully fetched the user',
                data: user,
                err: {}
            });
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Not able to fetch user.',
                data: {},
                success: false,
                err: error
            });
        }
    }
}

module.exports =new UserController();
