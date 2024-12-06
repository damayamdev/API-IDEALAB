const ResponseHandler = require('../../shared/response/ResponseHandler');
const { registerSchema, loginSchema } = require('../../application/validators/userValidator');

class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return ResponseHandler.badRequest(res, 'Validation error', error.details);
      }

      const userId = await this.authService.register(req.body);
      return ResponseHandler.created(res, { userId }, 'User registered successfully');
    } catch (error) {
      if (error.message === 'Username or email already exists') {
        return ResponseHandler.badRequest(res, error.message);
      }
      return ResponseHandler.error(res, error.message);
    }
  }

  async login(req, res) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return ResponseHandler.badRequest(res, 'Validation error', error.details);
      }

      const { identifier, password } = req.body;
      const result = await this.authService.login(identifier, password);
      return ResponseHandler.success(res, result, 'Login successful');
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        return ResponseHandler.unauthorized(res, error.message);
      }
      return ResponseHandler.error(res, error.message);
    }
  }
}

module.exports = AuthController;