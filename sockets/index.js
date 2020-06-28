const connections = require('./connections');
const defaultHandler = require('./default');
const rpc = require('./rpc');

module.exports = {
  connections,
  default: defaultHandler,
  rpc,
};
