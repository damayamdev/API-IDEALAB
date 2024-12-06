/**
 * Interface for User Repository
 * This is a contract that any user repository implementation must follow.
 * It defines the required methods for user data persistence.
 */
class IUserRepository {
  /**
   * Find a user by their username
   * @param {string} username - The username to search for
   * @returns {Promise<User|null>} The user if found, null otherwise
   */
  async findByUsername(username) {
    throw new Error('findByUsername method must be implemented');
  }

  /**
   * Find a user by their email
   * @param {string} email - The email to search for
   * @returns {Promise<User|null>} The user if found, null otherwise
   */
  async findByEmail(email) {
    throw new Error('findByEmail method must be implemented');
  }

  /**
   * Create a new user
   * @param {User} user - The user entity to create
   * @returns {Promise<number>} The ID of the created user
   */
  async create(user) {
    throw new Error('create method must be implemented');
  }

  /**
   * Find a user by their ID
   * @param {number} id - The user ID to search for
   * @returns {Promise<User|null>} The user if found, null otherwise
   */
  async findById(id) {
    throw new Error('findById method must be implemented');
  }
}

module.exports = IUserRepository;