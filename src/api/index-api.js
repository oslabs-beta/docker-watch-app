const express = require('express');
const cors = require('cors');
const {InfluxDB, Point} = require('@influxdata/influxdb-client');
require('dotenv').config({path: '../../.env'})

const PORT = 8081;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());

const DB_URL = 'http://localhost:8086/';
const DB_API_TOKEN = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const DB_ORG = process.env.DB_INFLUXDB_INIT_ORG;
const DB_BUCKET = process.env.DB_INFLUXDB_INIT_BUCKET;

// console.log(DB_API_TOKEN);

// connect to the influx db using url and token
const influxDB = new InfluxDB({url: DB_URL, token: DB_API_TOKEN})

// specify the org to send query to
const queryApi = influxDB.getQueryApi(DB_ORG);

// write the query
const query = `from(bucket: "${DB_BUCKET}") |> range(start: -1h)`
queryApi.queryRows(query, {
  next(row, tableMeta) {
    const o = tableMeta.toObject(row)
    console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`)
  },
  error(error) {
    console.error(error)
    console.log('Finished ERROR')
  },
  complete() {
    console.log('Finished SUCCESS')
  },
})


// write the query



// const writeApi = influxDB.getWriteApi(DB_ORG, DB_BUCKET)
// writeApi.useDefaultTags({host: 'host1'})

// const point = new Point('mem').floatField('used_percent', 23.43234543)
// writeApi.writePoint(point)

// writeApi
//     .close()
//     .then(() => {
//         console.log('FINISHED')
//     })
//     .catch(e => {
//         console.error(e)
//         console.log('Finished ERROR')
//     })



