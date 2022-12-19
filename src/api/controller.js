/* eslint-disable no-underscore-dangle */
const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config({ path: '../../.env' });

const DB_URL = process.env.DB_URL || 'http://127.0.0.1:8086';
const DB_API_TOKEN = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const DB_ORG = process.env.DB_INFLUXDB_INIT_ORG;
const DB_BUCKET = process.env.DB_INFLUXDB_INIT_BUCKET;

const controller = {};

controller.getContainers = (req, res, next) => {
  // query the db to return an array of objects with container names and ids

  // connect to the influx db using url and token
  const influxDB = new InfluxDB({ url: DB_URL, token: DB_API_TOKEN });

  // specify the org to send query to
  const queryApi = influxDB.getQueryApi(DB_ORG);

  // specify range of time to query db
  const range = '1h';

  // initialize array to collect query data
  const containers = [];

  // write the query
  const query = `from(bucket: "${DB_BUCKET}")
    |> range(start: -${range})
    |> group(columns: ["container_id", "container_name"])
    |> distinct(column: "container_id")`;
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      // keep track of if the container is in the array
      let containerInArr = false;
      containers.forEach((nameObj) => {
        if (nameObj.id === o.container_id) containerInArr = true;
      });
      // if container not in array, add it
      if (!containerInArr) {
        containers.push({
          name: o.container_name,
          id: o.container_id,
        });
      }
    },
    error(error) {
      console.log('Finished ERROR');
      return next(error);
    },
    complete() {
      // console.log('Finished SUCCESS');
      res.locals.containers = containers;
      return next();
    },
  });
};

controller.getContainerStats = (req, res, next) => {
  // query db for all stats for a specific container

  // destructure id from request
  const { id } = req.params;

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
      // if current time not in obj, add it
      if (!dataObj[o._time]) {
        dataObj[o._time] = {};
      }
      // add info on curent row to the object at the associated time key
      dataObj[o._time][`${o._measurement}_${o._field}`] = o._value;
    },
    error(error) {
      console.log('Finished ERROR');
      return next(error);
    },
    complete() {
      // console.log('Finished SUCCESS');
      res.locals.stats = dataObj;
      return next();
    },
  });
};

module.exports = controller;
