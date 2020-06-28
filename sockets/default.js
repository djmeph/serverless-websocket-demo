module.exports = async (event, context, callback) => callback(null, {
  statusCode: 200,
  body: event.requestContext,
});
