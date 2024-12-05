const AuthService = require('../../application/services/AuthService');
const { registerSchema, loginSchema } = require('../../application/validators/userValidator');

class AuthController {
  constructor(userRepository) {
    this.authService = new AuthService(userRepository);
  }

  async register(req, res) {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const userId = await this.authService.register(req.body);
      res.status(201).json({ 
        message: 'User registered successfully',
        userId 
      });
    } catch (error) {
      if (error.message === 'Username or email already exists') {
        return res.status(409).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const { identifier, password } = req.body;
      const result = await this.authService.login(identifier, password);
      
      res.json(result);
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AuthController;