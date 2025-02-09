const {UserRepositories} = require('../repositories');
const {User} = require('../models');

let userCounter = 1

class UserService {
    getAllUsers() {
        return UserRepositories.getAll();
    }

    getUserById(id) {
        return UserRepositories.getById(id);
    }

    createUser(name, email, ages, bod) {
        const id = userCounter++
        const user = new User(id, name, email, ages, bod);
        return UserRepositories.create(user);
    }

    updateUser(id, userData) {
        return UserRepositories.update(id, userData);
    }

    deleteUser(id) {
        return UserRepositories.delete(id);
    }
}

module.exports = new UserService();
