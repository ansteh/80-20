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

const findParetoSeperator = (accumulated) => {
  let bench = _.floor(_.last(accumulated).cume*0.2);
  return _.find(accumulated, (data) => {
    return data.cume > bench;
  });
}

const rate = (values) => {
  let accumulated = accumulate(values);
  let seperator = findParetoSeperator(accumulated);
  return [_.ceil(seperator.cume/_.last(accumulated).cume*100), 20];
}

module.exports = {
  accumulate: accumulate,
  rate: rate
}
