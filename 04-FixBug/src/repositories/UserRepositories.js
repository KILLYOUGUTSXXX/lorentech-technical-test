class UserRepository {
    constructor() {
        this.users = [];
    }

    getAll() {
        return this.users;
    }

    getById(id) {
        return this.users.find(user => user.id.toString() === (id || '').toString());
    }

    create(user) {
        this.users.push(user);
        return user;
    }

    update(id, userData) {
        const userIndex = this.users.findIndex(user => user.id.toString() === (id || '').toString());
        if (userIndex === -1) return null;

        this.users[userIndex] = { ...this.users[userIndex], ...userData };
        return this.users[userIndex];
    }

    delete(id) {
        const userIndex = this.users.findIndex(user => user.id.toString() === (id || '').toString());
        
        if (userIndex === -1) return null;

        const deletedUser = this.users.splice(userIndex, 1);
        return deletedUser[0];
    }
}

module.exports = new UserRepository();
