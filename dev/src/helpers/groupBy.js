var _groupBy = require('lodash.groupby');

let groupBy = async (array, field) =>{
  return _groupBy(array, field);
};

module.exports = {
    groupBy
}