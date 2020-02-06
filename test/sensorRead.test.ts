import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';

import { GetItemInput } from 'aws-sdk/clients/dynamodb';

describe('Sensor Read', () => {
  test('from mocked dynamoDB', async () => {
    const TableName = 'SensorData';
    const itemId = 'Item1';
    const fixture = {
      itemId: 'item1',
      content: 'content1',
    };

    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'get', (_params: GetItemInput, callback: Function) => {
      callback(null, fixture);
    });

    const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
    const result = await dynamo
      .get({
        TableName,
        Key: {
          itemId,
        },
      })
      .promise();

    expect(result).toStrictEqual(fixture);

    AWSMock.restore('DynamoDB.DocumentClient');
  });
});
