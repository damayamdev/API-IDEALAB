const request = require('supertest');
const app = require('../src/index');
const { pool } = require('../src/infrastructure/database/mysql');

describe('Vehicle API', () => {
  beforeAll(async () => {
    // Setup test database
    await pool.query('DELETE FROM vehicles');
  });

  afterAll(async () => {
    await pool.end();
  });

  it('should create a new vehicle', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .send({
        vehicleType: 'Truck',
        loadCapacity: 5000.00,
        licensePlate: 'ABC123',
        operatingCompany: 'Test Company'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should get all vehicles', async () => {
    const response = await request(app).get('/api/vehicles');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });
});