const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  it('should return status code 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should render the index view', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Welcome to Haikus for Codespaces');
  });

  it('should pass the haikus data to the view', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Autumn');
    expect(response.text).toContain('Leaves falling gently');
    expect(response.text).toContain('Ocean');
    expect(response.text).toContain('Waves crashing on shore');
    // Add more assertions for other haikus if needed
  });
});

describe('Static files', () => {
  it('should serve static files from the public directory', async () => {
    const response = await request(app).get('/styles.css');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('text/css');
  });
});