import { logError, logSuccess } from '../src/utils/logs';

describe('logError', () => {
  test('the returned object', () => {
    const response = logError('a message');

    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toEqual(400);

    expect(response).toHaveProperty('body');
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('Error: a message');
  });
});

describe('logSuccess', () => {
  test('the returned object', () => {
    const response = logSuccess({
      message: 'a message',
    });

    expect(response).toHaveProperty('statusCode');
    expect(response.statusCode).toEqual(200);

    expect(response).toHaveProperty('body');
    expect(typeof response.body).toBe('string');

    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('message');
    expect(body.message).toBe('a message');
  });
});
