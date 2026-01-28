const UserRepository = require('../repository/user-repository.js');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { SECRET_TOKEN } = require('../config/serverConfig.js');

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
            console.log("Password is right.");
            if (!validPassword) {
                throw { error: "Wrong password by user" };
            }

            // create token
            // user -> fetched from database
            const token = await this.crateToken({
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
            console.log("Something went wrong in the service layer");
            throw error;
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

    async crateToken(payload) {
        try {
            // only 3 parameters
            const token = JWT.sign(payload, SECRET_TOKEN, { expiresIn: 800000 });
            return token;
        } catch (error) {
            console.log("Something went wrong in token creation.");
            throw error;
        }
    }
}

module.exports = UserService;