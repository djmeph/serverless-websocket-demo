const AWS = require('aws-sdk');

module.exports = async (event, context, callback) => {
  const { data } = JSON.parse(event.body);
  const websocket = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: JSON.stringify({ id: data.id, value: 40 }),
  }).promise();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: JSON.stringify({ id: data.id, value: 60 }),
  }).promise();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: JSON.stringify({ id: data.id, value: 80 }),
  }).promise();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await websocket.postToConnection({
    ConnectionId: event.requestContext.connectionId,
    Data: JSON.stringify({ id: data.id, value: 100 }),
  }).promise();

  return callback(null, {
    statusCode: 200,
    body: event.requestContext.eventType,
  });
};
