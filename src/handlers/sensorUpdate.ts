import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

import { crudReturnInter } from '../types/crudInterface';
import { read } from './sensorRead';

import { dynamo } from '../utils/dynamo';
import { logError, logSuccess } from '../utils/logs';

/**
 * Update one item
 * If not exists we return an error
 * @param event
 */
const update = async (event: APIGatewayProxyEvent): Promise<crudReturnInter> => {
  try {
    const itemId = event && event.pathParameters && event.pathParameters.itemId;
    const timestamp = new Date().toISOString();
    const { TableName } = process.env;

    const { content } = JSON.parse(event && event.body);

    const { statusCode } = await read(event);
    if (statusCode === 400) {
      throw `Item ${itemId} unknown`;
    }

    // update one item by the itemId
    await dynamo
      .update({
        TableName,
        Key: {
          itemId,
        },
        ExpressionAttributeValues: {
          ':content': content,
          ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET content = :content, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return logSuccess({
      message: `Item ${itemId} updated at ${timestamp}`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { update };
