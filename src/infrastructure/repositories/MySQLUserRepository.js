const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const UserModel = require('../database/models/user.model');

class MySQLUserRepository extends IUserRepository {
  async findByUsername(username) {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) return null;
    
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.role
    );
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.role
    );
  }

  async create(user) {
    const newUser = await UserModel.create({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role
    });
    
    return newUser.id;
  }

  async findById(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    
    return new User(
      user.id,
      user.username,
      user.email,
      user.password,
      user.role
    );
  }
}

module.exports = MySQLUserRepository;