class IUserRepository {
    async findByUsername(username) {
      throw new Error('Method not implemented');
    }
  
    async findByEmail(email) {
      throw new Error('Method not implemented');
    }
  
    async create(user) {
      throw new Error('Method not implemented');
    }
  
    async findById(id) {
      throw new Error('Method not implemented');
    }
  }
  
  module.exports = IUserRepository;