import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

import { crudReturnInter } from './crudInterface';

import { dynamo } from '../utils/dynamo';
import { logError, logSuccess } from '../utils/logs';

/**
 * Remove one item
 * @param event
 */
const remove = async (event: APIGatewayProxyEvent): Promise<crudReturnInter> => {
  try {
    const itemId = event && event.pathParameters && event.pathParameters.itemId;
    const { TableName } = process.env;

    // delete one item by the itemId
    await dynamo
      .delete({
        TableName,
        Key: {
          itemId,
        },
      })
      .promise();

    return logSuccess({
      message: `Item ${itemId} deleted`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { remove };
