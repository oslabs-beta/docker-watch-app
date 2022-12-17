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
  // console.log(DB_ORG);

  // connect to the influx db using url and token
  const influxDB = new InfluxDB({ url: DB_URL, token: DB_API_TOKEN });

  // specify the org to send query to
  const queryApi = influxDB.getQueryApi(DB_ORG);

  // specify range of time to query db
  const range = '1h';

  // initialize array to collect query data
  const data = [];

  // write the query
  const query = `from(bucket: "${DB_BUCKET}") |> range(start: -${range})`;
  queryApi.queryRows(query, {
    next(row, tableMeta) {
      const o = tableMeta.toObject(row);
      // eslint-disable-next-line no-underscore-dangle
      data.push(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
      // console.log(data);
    },
    error(error) {
      console.log('Finished ERROR');
      return next(error);
    },
    complete() {
      console.log('Finished SUCCESS');
      res.locals.data = data;
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
  const containers = [{
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
  containers.forEach((container) => {
    if (container.id === id) {
      // for real data we will query db for specific id
      // data will be parsed into an array of objects with the format of the one below
      // mock data
      res.locals.stats = [{
        time: '2022-12-17T17:23:52Z',
        cpu_total_usage: 898278000,
        memory_total_usage: 43073536,
      },
      {
        time: '2022-12-17T17:23:53Z',
        cpu_total_usage: 913082000,
        memory_total_usage: 43290624,
      },
      {
        time: '2022-12-17T17:23:48Z',
        cpu_total_usage: 1164931000,
        memory_total_usage: 52273152,
      },
      {
        time: '2022-12-17T17:23:53Z',
        cpu_total_usage: 1180677000,
        memory_total_usage: 53178368,
      },
      ];
    }
  });
  return next();
};

module.exports = controller;
