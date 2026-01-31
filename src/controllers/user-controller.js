const UserService = require('../services/user-service');

class UserController {
    constructor() {
        this.userService = new UserService();
        this.create = this.create.bind(this);
        this.destroy = this.destroy.bind(this);
        this.get = this.get.bind(this);
        this.signIn = this.signIn.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.isAdmin = this.isAdmin.bind(this);
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
            return res.status(error.statusCode).json({
                message: error.message,
                data: {},
                success: false,
                err: error.explanation
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

    async signIn(req, res) {
        try {
            const user = await this.userService.signIn(req.body.email, req.body.password);
            res.status(201).json({
                success: true,
                message: 'Successfully sign in the user',
                token: user,
                err: {}
            });
        }
         catch (error) {
            console.log(error);
            return res.status(404).json({
                message: 'Not able to sign in user.',
                token: {},
                success: false,
                err: error
            });
        }
    }

    async isAuthenticated(req, res) {
        try {

            // get the token in headers
            // const token = req.headers['authorization']; // -> bearer
            const token = req.headers['x-access-token'];
            // console.log(token);
            // do it in service since more logic needed
            // verify the token
            // const isVerifiedToken = await this.userService.verifyToken(token); // {email,id,iat,exp}
            const response = await this.userService.isAuthenticated(token);
            return res.status(200).json({
                success: true,
                err: {},
                data: response,
                message: 'User is authenticated and token is valid.'
            });
        } catch (error) {
            return res.status(404).json({
                message: 'Not able to authenticate the user.',
                token: {},
                success: false,
                err: error
            });
        }
    }

    async isAdmin(req, res) {
        try {
            const response = await this.userService.isAdmin(req.body.id);
            res.status(200).json({
                success: true,
                data: response,
                err: {},
                message: "Successfully fetched whether user is ADMIN or NOT."
            });
        } catch (error) {
            return res.status(404).json({
                message: 'Something went wrong in isAdmin controllers.',
                data: {},
                success: false,
                err: error
            });
        }
    }

}

module.exports =new UserController();
