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

const findParetoSeperator = (accumulated, ratio = 0.8) => {
  let bench = _.floor(_.last(accumulated).cume*ratio);
  return _.find(accumulated, (data) => {
    return data.cume > bench;
  });
}

const rate = (values, ratio = 0.8) => {
  let accumulated = accumulate(values);
  let seperator = findParetoSeperator(accumulated, ratio);
  let right = _.ceil(seperator.cume/_.last(accumulated).cume*100);
  let left = _.ceil((1-ratio)*100);
  let rest = 100-(right+left);
  right += rest;
  return [right, left];
}

module.exports = {
  accumulate: accumulate,
  rate: rate
}
