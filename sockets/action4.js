const AWS = require('aws-sdk');

module.exports = async (event, context, callback) => {
  const { data } = JSON.parse(event.body);
  const websocket = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  await new Promise((resolve) => this.setTimeout(resolve, 3000));

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: data,
  }).promise();

  return callback(null, {
    statusCode: 200,
    body: event.requestContext.eventType,
  });
};
