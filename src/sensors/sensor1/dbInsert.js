require('dotenv').config({ path: '../../../.env' });

/** @module write
 * Writes a data point to InfluxDB using the Javascript client library with Node.js. */
const { InfluxDB } = require('@influxdata/influxdb-client');
const { Point } = require('@influxdata/influxdb-client');

/* Environment variables * */
const token = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const org = process.env.DB_INFLUXDB_INIT_ORG;
const bucket = process.env.DB_INFLUXDB_INIT_BUCKET;

const dbFunc = (containerStats) => {
  // Create a write client from the getWriteApi method. Provide your `org` and `bucket`
  const client = new InfluxDB({ url: 'http://localhost:8086', token });

  const writeApi = client.getWriteApi(org, bucket, 's');

  // Create a point and write it to the buffer
  writeApi.useDefaultTags({ container_id: 'container_id', container_name: 'container_name' });

  /* Use the Point() constructor to create a point,
  In InfluxDB, a point represents a single data record */

  const pointCPU = new Point('CPU')
    .tag('container_id', containerStats.name)
    .tag('container_name', containerStats.id)
    .floatField('total_usage', containerStats.cpu);

  const pointMemory = new Point('Memory')
    .tag('container_id', containerStats.name)
    .tag('container_name', containerStats.id)
    .floatField('total_usage', containerStats.memory);

  // Use the writePoint() method to write the point to your InfluxDB bucket
  writeApi.writePoint(pointCPU);
  writeApi.writePoint(pointMemory);

  // Flush pending writes and close writeApi
  writeApi
    .close()
    // .then(() => {
    //   console.log('FINISHED');
    // })
    .catch((e) => {
      console.error(e);
      console.log('Finished ERROR');
    });
};

module.exports = dbFunc;
