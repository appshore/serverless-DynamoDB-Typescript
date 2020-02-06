import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';
import { v1 as uuidV1 } from 'uuid';

import { crudReturnInter } from '../types/crudInterface';

import { dynamo } from '../utils/dynamo';
import { logError, logSuccess } from '../utils/logs';

/**
 * Create a new item
 * @param event
 */
const create = async (event: APIGatewayProxyEvent): Promise<crudReturnInter> => {
  try {
    const itemId = uuidV1();
    const timestamp = new Date().toISOString();
    const { content } = JSON.parse(event && event.body);
    const { TableName } = process.env;

    // Add an item to dynamoDB
    await dynamo
      .put({
        TableName,
        Item: {
          itemId,
          content,
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      })
      .promise();

    return logSuccess({
      message: `Item ${itemId} created at ${timestamp}`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { create };
