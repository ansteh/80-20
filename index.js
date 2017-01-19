'use strict';
const _ = require('lodash');

const accumulate = (values) => {
  let cume = 0;
  return _.chain(values)
  .sortBy(value => -value)
  .map(value => {
    cume += value;
    return {
      value: value,
      cume: cume
    };
  })
  .value();
}

const findParetoMark = (accumulated, cause = 0.2) => {
  let lastIndex = accumulated.length-1;
  let index = _.min([_.ceil(lastIndex*cause), lastIndex]);
  return accumulated[index];
}

const rate = (values, cause = 0.2) => {
  let accumulated = accumulate(values);
  let mark = findParetoMark(accumulated, cause);
  let impact = mark.cume/_.last(accumulated).cume;
  return [impact, cause];
}

module.exports = {
  accumulate: accumulate,
  rate: rate
}
