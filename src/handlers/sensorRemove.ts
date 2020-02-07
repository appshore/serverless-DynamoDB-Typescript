import { APIGatewayProxyEvent } from 'aws-lambda';
import 'source-map-support/register';

import { crudReturnInter } from '../types/crudInterface';
import { read } from './sensorRead';

import { dynamo } from '../utils/dynamo';
import * as email from '../utils/email';
import { logError, logSuccess } from '../utils/logs';
import * as slack from '../utils/slack';

/**
 * Remove one item
 * @param event
 */
const remove = async (event: APIGatewayProxyEvent): Promise<crudReturnInter> => {
  try {
    const itemId = event && event.pathParameters && event.pathParameters.itemId;
    const timestamp = new Date().toISOString();
    const { TableName } = process.env;

    const { body, statusCode } = await read(event);
    if (statusCode === 400) {
      throw `Item ${itemId} unknown`;
    }

    // delete one item by the itemId
    await dynamo
      .delete({
        TableName,
        Key: {
          itemId,
        },
      })
      .promise();


    // Dev note: 
    // the email and slack functions could be refactored as lambdas subscribing to a service like SQS, SNS or Kinesis
    // In this case instead of calling them directly, we just need to publish once.
    // certainly a better solution if these functions are implemented in all operations.

    await email.send({
      Subject: `Item ${itemId} on table ${TableName} deleted at ${timestamp}`,
      Message: JSON.stringify(body, null, 2),
    });

    await slack.post({
      channel: '#sensorBot',
      text: `Item ${itemId} on table ${TableName} deleted at ${timestamp} ${JSON.stringify(body, null, 2)}`,
    });

    return logSuccess({
      message: `Item ${itemId} deleted`,
    });
  } catch (error) {
    return logError(error);
  }
};

export { remove };
