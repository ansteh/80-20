'use strict';
const _ = require('lodash');
const pareto = require('./index.js');

const random = (count, limit) => {
  return _.map(_.range(count), () => _.random(1, limit));
};

let data = random(100, 100);

console.log(pareto.rate(data));
