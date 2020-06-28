const AWS = require('aws-sdk');

module.exports = async (event, context, callback) => {
  const message = JSON.parse(event.body).data;
  const websocket = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: message,
  }).promise();

  return callback(null, {
    statusCode: 200,
    body: event.requestContext.eventType,
  });
};
