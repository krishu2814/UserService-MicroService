const { User, Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');

class UserRepository {
    
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            console.log("Something went wrong at user-Repository.");
            throw error;
        }
    }

    async destroy(data) {
        try {
            const user = await User.destroy(data);
            return user;
        } catch (error) {
            console.log("Something went wrong at user-Repository.");
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['email', 'id'], // only these columns in response
            });
            // console.log(user);
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async findByEmail(email){
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                }
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }

    async isAdmin(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw { error: 'User not found' };
            }
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN', // in Role model schema we wrote name
                }
            });
            if (!adminRole) {
                throw { error: 'ADMIN role not found' };
            }
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
}

module.exports = UserRepository;