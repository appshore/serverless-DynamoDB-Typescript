# Serverless - AWS Lambda - AWS DynamoDB - TypeScript

## Prerequisites

* Node.js V10+
* npm or yarn
* jre or jdk > v6 to run dynamoDB offline

## Run offline

```
# Install serverless globally
npm -g i serverless

# Install dependencies
npm i

# Install dynamoDB local (might vary depending of OS)
serverless dynamodb install

# Run dynamoDB local
serverless dynamodb start

# Transpile Typescript to ES6
yarn build

# Build offline lambdas
yarn offline
```

## Testing

```
# Run test
yarn test

# Run coverage
yarn coverage
```

A collection of Postman queries is available in the dataset folder.