const connections = require('./connections');
const defaultHandler = require('./default');
const action1 = require('./action1');
const action2 = require('./action2');
const action3 = require('./action3');
const action4 = require('./action4');
const action5 = require('./action5');
const action6 = require('./action6');

module.exports = {
  connections,
  default: defaultHandler,
  action1,
  action2,
  action3,
  action4,
  action5,
  action6,
};
