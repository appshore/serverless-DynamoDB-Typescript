import { check } from '../src/handlers/health';

describe('Sensor', () => {
  test('the returned object', () => {
    const response = check();

    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toEqual(200);

    expect(response).toHaveProperty('body');
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Function Health executed successfully!');
  });
});
