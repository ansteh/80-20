'use strict';
const _ = require('lodash');
const fs = require('fs');
const pareto = require('../index.js');

const loadJSON = (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if(err) {
        reject(err)
      } else {
        try {
          resolve(JSON.parse(content));
        } catch(err) {
          reject(err)
        }
      }
    })
  });
}

const assignRates = (data) => {
  console.log(pareto.rate(data));
  console.log(pareto.rate(data, 1));
  console.log(pareto.rate(data, 0.3));
  console.log(pareto.rate(data, 0.6));
  console.log(pareto.rate(data, 0.9));
}

const rateParetoDatasetFromFile = () => {
  return loadJSON(`${__dirname}/pareto.json`)
  .then(data => {
    let accumulated = pareto.accumulate(data);
    assignRates(data);
  })
  .catch(console.log);
}

const random = (count, limit) => {
  return _.map(_.range(count), () => _.random(1, limit));
}

const rateNormalDistributedDataset = () => {
  let data = random(100, 100);
  assignRates(data);
}

const generatePatetoDataset = (count, limit) => {
  return _.chain(_.range(count))
    .map(() => _.random(1, limit))
    .sortBy(value => -value)
    .value();
}

let dataset = generatePatetoDataset(100, 100);
assignRates(dataset);

// rateParetoDatasetFromFile();
// rateNormalDistributedDataset();
