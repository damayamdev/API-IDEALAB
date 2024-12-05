class User {
    constructor(id, username, email, password, role) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  
    validate() {
      if (!this.username || !this.email || !this.password) {
        throw new Error('Username, email and password are required');
      }
    }
  }
  
  module.exports = User;