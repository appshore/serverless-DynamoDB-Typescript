import 'source-map-support/register';

import { crudReturnInter } from './crudInterface';

import { dynamo } from '../utils/dynamo';
import { logError, logSuccess } from '../utils/logs';

/**
 * List all items
 */
const list = async (): Promise<crudReturnInter> => {
  try {
    const { TableName } = process.env;

    // List all items
    const { Items } = await dynamo
      .scan({
        TableName,
      })
      .promise();

    return logSuccess({
      Items,
      message: `${Items.length} items retrieved`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { list };
