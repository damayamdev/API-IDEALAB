const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const initDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        vehicle_id INT PRIMARY KEY AUTO_INCREMENT,
        vehicle_type VARCHAR(50) NOT NULL,
        load_capacity DECIMAL(10,2) NOT NULL,
        license_plate VARCHAR(10) UNIQUE NOT NULL,
        operating_company VARCHAR(100) NOT NULL
      )
    `);
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

module.exports = { pool, initDatabase };