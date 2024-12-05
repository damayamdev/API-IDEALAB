const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../domain/entities/User');

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(userData) {
    // Check if user already exists
    const existingUserByUsername = await this.userRepository.findByUsername(userData.username);
    const existingUserByEmail = await this.userRepository.findByEmail(userData.email);

    if (existingUserByUsername || existingUserByEmail) {
      throw new Error('Username or email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create new user
    const user = new User(
      null,
      userData.username,
      userData.email,
      hashedPassword,
      userData.role || 'user'
    );

    const userId = await this.userRepository.create(user);
    return userId;
  }

  async login(identifier, password) {
    // Find user by username or email
    let user = await this.userRepository.findByUsername(identifier);
    if (!user) {
      user = await this.userRepository.findByEmail(identifier);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }
}

module.exports = AuthService;