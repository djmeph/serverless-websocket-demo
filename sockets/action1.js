const AWS = require('aws-sdk');

module.exports = async (event, context, callback) => {
  const { data } = JSON.parse(event.body);
  const websocket = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: `${event.requestContext.domainName}/${event.requestContext.stage}`,
  });
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await websocket.postToConnection({
      ConnectionId: event.requestContext.connectionId,
      Data: JSON.stringify({ id: data.id, value: 20 }),
    }).promise();

    return callback(null, {
      statusCode: 200,
      body: event.requestContext.eventType,
    });
  } catch (err) {
    await websocket.postToConnection({
      ConnectionId: event.requestContext.connectionId,
      Data: JSON.stringify({ id: data.id, err }),
    }).promise();

    return callback(err, {
      statusCode: 500,
      body: event.requestContext.eventType,
    });
  }
};
