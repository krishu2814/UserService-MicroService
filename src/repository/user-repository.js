const { User } = require('../models/index');

class UserRepository {
    
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
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


}

module.exports = UserRepository;