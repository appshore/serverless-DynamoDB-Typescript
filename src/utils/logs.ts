import { crudReturnInter } from '../handlers/crudInterface';

/**
 * Log error
 * @param error
 */
const logError = (error: string): crudReturnInter => ({
  statusCode: 400,
  body: JSON.stringify(
    {
      message: `Error: ${error}`,
    },
    null,
    2
  ),
});

/**
 * Log success
 * @param content an object that varies according functions
 */
const logSuccess = (obj: Object): crudReturnInter => ({
  statusCode: 200,
  body: JSON.stringify(obj, null, 2),
});

export { logError, logSuccess };
