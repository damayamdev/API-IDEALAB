const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const { pool } = require('../database/mysql');

class MySQLUserRepository extends IUserRepository {
  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User(
      row.user_id,
      row.username,
      row.email,
      row.password,
      row.role
    );
  }

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User(
      row.user_id,
      row.username,
      row.email,
      row.password,
      row.role
    );
  }

  async create(user) {
    const [result] = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [user.username, user.email, user.password, user.role]
    );
    return result.insertId;
  }

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (rows.length === 0) return null;
    
    const row = rows[0];
    return new User(
      row.user_id,
      row.username,
      row.email,
      row.password,
      row.role
    );
  }
}

module.exports = MySQLUserRepository;