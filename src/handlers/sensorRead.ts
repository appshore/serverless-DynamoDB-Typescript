import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

import { crudReturnInter } from '../types/crudInterface';

import { dynamo } from '../utils/dynamo';
import { logError, logSuccess } from '../utils/logs';

/**
 * Read one item
 * @param event
 */
const read = async (event: APIGatewayProxyEvent): Promise<crudReturnInter> => {
  try {
    const itemId = event && event.pathParameters && event.pathParameters.itemId;
    const { TableName } = process.env;

    // retrieve one item by the itemId
    const { Item } = await dynamo
      .get({
        TableName,
        Key: {
          itemId,
        },
      })
      .promise();

    if (!Item) {
      throw `Item ${itemId} unknown`;
    }

    return logSuccess({
      Item,
      message: `Item ${itemId} retrieved`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { read };
