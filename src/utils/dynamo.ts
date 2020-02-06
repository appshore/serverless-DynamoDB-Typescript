import { DynamoDB } from 'aws-sdk';

// retrieve env vars generated by ssm plus stage context
const { IS_OFFLINE } = process.env;

// set dynamo client according stage context
const dynamo = new DynamoDB.DocumentClient(
  IS_OFFLINE
    ? {
        region: 'localhost',
        endpoint: 'http://localhost:8000', // hardcoded here but we can also set it as a ssm key
      }
    : {}
);

export { dynamo };