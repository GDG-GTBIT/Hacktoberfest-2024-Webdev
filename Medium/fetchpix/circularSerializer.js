const util = require('util');

module.exports = {
  test(val) {
    return typeof val === 'object' && val !== null;
  },
  print(val, serialize, indent) {
    return util.inspect(val, { depth: null });
  },
};
