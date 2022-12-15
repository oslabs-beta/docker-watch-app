const { InfluxDB } = require('@influxdata/influxdb-client');
require('dotenv').config({ path: '../../.env' });

const DB_URL = process.env.DB_URL || 'http://127.0.0.1:8086';
const DB_API_TOKEN = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const DB_ORG = process.env.DB_INFLUXDB_INIT_ORG;
const DB_BUCKET = process.env.DB_INFLUXDB_INIT_BUCKET;

const controller = {};
// eslint-disable-next-line no-unused-expressions
controller.getStatsFromDB = (req, res, next) => {
  console.log('hiiiiiiii');
  console.log(DB_URL);

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
      console.log(data);
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

module.exports = controller;
