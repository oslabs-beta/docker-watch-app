/* eslint-disable no-underscore-dangle */
const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config({ path: '../../.env' });

const DB_URL = process.env.DB_URL || 'http://127.0.0.1:8086';
// const DB_URL = 'http://DB:8086';
const DB_API_TOKEN = process.env.DOCKER_INFLUXDB_INIT_ADMIN_TOKEN
  || process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const DB_ORG = process.env.DOCKER_INFLUXDB_INIT_ORG
  || process.env.DB_INFLUXDB_INIT_ORG;
const DB_BUCKET = process.env.DOCKER_INFLUXDB_INIT_BUCKET
  || process.env.DB_INFLUXDB_INIT_BUCKET;

const controller = {};
// eslint-disable-next-line no-unused-expressions
controller.getStatsFromDB = (req, res, next) => {
  // connect to the influx db using url and token
  const influxDB = new InfluxDB({ url: DB_URL, token: DB_API_TOKEN });

  // specify the org to send query to
  const queryApi = influxDB.getQueryApi(DB_ORG);

  // specify range of time to query db
  const range = '1h';

  // initialize array to collect query data
  const data = [];
  const dataObj = {};
  const containerID = '2aca32836fada5133bb1d2964c7de538ede8a46d2b4839720e32f302817ac28f';

  // write the query
  const query = `from(bucket: "${DB_BUCKET}")
    |> range(start: -${range}) 
    |> filter(fn: (r) => r["container_id"] == "${containerID}")`;
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      // eslint-disable-next-line no-underscore-dangle
      // const measurementObj = {};
      // measurementObj[`${o._measurement}.total_usage`] = o._value;
      if (!dataObj[o._time]) {
        dataObj[o._time] = {};
      }
      // console.log(o._tag);
      dataObj[o._time][`${o._measurement}_${o._field}`] = o._value;

      data.push(dataObj);
      // console.log(data);
    },
    error(error) {
      console.log('Finished ERROR');
      return next(error);
    },
    complete() {
      console.log('Finished SUCCESS');
      res.locals.data = dataObj;
      return next();
    },
  });
};

controller.getContainers = (req, res, next) => {
  // for real data, this will be a query to the db for container name and id
  // this data will be parsed into an object array with structure like the one below
  // mock data
  res.locals.containers = [
    {
      name: '/docker-probe-testing',
      id: 'b0020246ccfbbcab0b51972162a4beaa0ed76eaa1287975ca600c79ddbc51622',
    },
    {
      name: 'container2',
      id: '123445356457252345',
    },
    {
      name: 'container3',
      id: '563457456857942347',
    },
  ];
  // console.log(res.locals.containers[0]);
  return next();
};

controller.getContainerStats = (req, res, next) => {
  const { id } = req.params;
  // for real data we will make call to db to get all data
  // mock data from above
  // connect to the influx db using url and token
  const influxDB = new InfluxDB({ url: DB_URL, token: DB_API_TOKEN });

  // specify the org to send query to
  const queryApi = influxDB.getQueryApi(DB_ORG);

  // specify range of time to query db
  const range = '1h';

  // initialize array to collect query data
  const dataObj = {};
  const containerID = id;

  // write the query
  const query = `from(bucket: "${DB_BUCKET}")
    |> range(start: -${range}) 
    |> filter(fn: (r) => r["container_id"] == "${containerID}")`;
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      // eslint-disable-next-line no-underscore-dangle
      if (!dataObj[o._time]) {
        dataObj[o._time] = {};
      }
      // console.log(o._tag);
      dataObj[o._time][`${o._measurement}_${o._field}`] = o._value;

      // console.log(data);
    },
    error(error) {
      console.log('Finished ERROR');
      return next(error);
    },
    complete() {
      console.log('Finished SUCCESS');
      res.locals.stats = dataObj;
      return next();
    },
  });
};

module.exports = controller;
