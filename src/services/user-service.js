const UserRepository = require('../repository/user-repository.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { EXPIRES_IN } = require('../config/serverConfig.js');
const AppErrors = require('../utils/error-handler.js');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signIn(email, passwordByUser) {
        try {

            // find user by email
            const user = await this.userRepository.findByEmail(email);
            if (!user) {
                throw error;
            }

            // compare password with hashed passsword in db
            // user.password -> database stored password
            const validPassword = await this.checkPassword(passwordByUser, user.password);
            // console.log("Password is right.");
            if (!validPassword) {
                throw { error: "Wrong password by user" };
            }

            // create token
            // user -> fetched from database
            const token = await this.createToken({
                email: user.email,
                id: user.id,
            });
            // console.log(token);
            return token;

        } catch (error) {
            console.log("Cannot sign in user.");
            throw error;
        }
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw error;
            }
            console.log("Something went wrong in the service layer.");
            throw new AppErrors(
                'ServerError',
                'Something went wrong in the service layer',
                'Logical issue found',
                500
            );
            throw error
        }
    }

    async destroy(data) {
        try {
            const user = await this.userRepository.destroy(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer.");
            throw error;
        }
    }

    async get(userId) {
        try {
            const user = await this.userRepository.getUserById(userId);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer.");
            throw error;
        }
    }

    async checkPassword(passwordByUser, databaseHashedPassword) {
        try {
           return await bcrypt.compare(passwordByUser, databaseHashedPassword);            
        } catch (error) {
            console.log("Something went wrong in token validation in service layer.", error);
            throw error;
        }       
    }

    async createToken(payload) {
        try {

            // only 3 parameters
            // payload -> email, id
            const token = JWT.sign(payload, process.env.SECRET_TOKEN, { expiresIn: EXPIRES_IN });
            return token;
        } catch (error) {
            console.log("Something went wrong in token creation.");
            throw error;
        }
    }

    async isAuthenticated(token) {
        try {
            const istokenVerified = await this.verifyToken(token);
            if (!istokenVerified) {
                throw { error : 'Invalid Token!'}
            }
            /**
             * Checking if user deleted the account after token creation
             */
            const user = await this.userRepository.getUserById(istokenVerified.id);
            if (!user) {
                throw { error: 'No valid user with corresponding token exists.'}
            }

            // important will need later -> practise
            return {
                id: user.id,
                email: user.email
            };
        } catch (error) {
            console.log("Something went wrong in authentication.");
            throw error;
        }
    }

    async verifyToken(token) {
        try {
            const response = JWT.verify(token, process.env.SECRET_TOKEN);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    async isAdmin(userId) {
        try {
            return await this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

}

module.exports = UserService;
