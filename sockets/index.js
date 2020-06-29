const connections = require('./connections');
const defaultHandler = require('./default');
const action1 = require('./action1');
const action2 = require('./action2');

module.exports = {
  connections,
  default: defaultHandler,
  action1,
  action2,
};
