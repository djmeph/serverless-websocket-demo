const AWS = require('aws-sdk');
const { DYNAMODB_CONNECTIONS_TABLE } = require('../config');

const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

module.exports = async (event, context, callback) => {
  try {
    switch (event.requestContext.eventType) {
      case 'CONNECT':
        await dynamodb.put({
          TableName: DYNAMODB_CONNECTIONS_TABLE,
          Item: {
            connectionId: event.requestContext.connectionId,
          },
        }).promise();
        return callback(null, {
          statusCode: 200,
          body: event.requestContext.eventType,
        });

      case 'DISCONNECT':
        await dynamodb.delete({
          TableName: DYNAMODB_CONNECTIONS_TABLE,
          Key: {
            connectionId: event.requestContext.connectionId,
          },
        }).promise();
        return callback(null, {
          statusCode: 200,
          body: event.requestContext.eventType,
        });

      default:
        return callback(null, {
          statusCode: 200,
          body: event.requestContext.eventType,
        });
    }
  } catch (err) {
    return callback(err, {
      statusCode: 500,
      body: 'Error',
    });
  }
};
