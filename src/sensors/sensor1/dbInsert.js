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
  const dbURL = process.env.DB_URL || 'http://127.0.0.1:8086';

  // Create a write client from the getWriteApi method. Provide your `org` and `bucket`
  const client = new InfluxDB({ url: dbURL, token });

  const writeApi = client.getWriteApi(org, bucket, 's');

  // Create a point and write it to the buffer
  writeApi.useDefaultTags({
    container_id: 'container_id',
    container_name: 'container_name',
  });

  /* Use the Point() constructor to create a point,
  In InfluxDB, a point represents a single data record */

  const pointCPU = new Point('CPU')
    .tag('container_id', containerStats.id)
    .tag('container_name', containerStats.name)
    .floatField('total_usage', containerStats.cpu);

  const pointMemory = new Point('Memory')
    .tag('container_id', containerStats.id)
    .tag('container_name', containerStats.name)
    .floatField('total_usage', containerStats.memory);

  const pointDisk = new Point('Disk')
    .tag('container_id', containerStats.id)
    .tag('container_name', containerStats.name)
    .floatField('read_value', containerStats.disk_read)
    .floatField('write_value', containerStats.disk_write);

  const pointNetwork = new Point('Network')
    .tag('container_id', containerStats.id)
    .tag('container_name', containerStats.name)
    .floatField('rx_bytes', containerStats.rx_bytes)
    .floatField('rx_dropped', containerStats.rx_dropped)
    .floatField('rx_errors', containerStats.rx_errors)
    .floatField('rx_packets', containerStats.rx_packets)
    .floatField('tx_bytes', containerStats.tx_bytes)
    .floatField('tx_dropped', containerStats.tx_dropped)
    .floatField('tx_errors', containerStats.tx_errors)
    .floatField('tx_packets', containerStats.tx_packets);

  // Use the writePoint() method to write the point to your InfluxDB bucket
  writeApi.writePoint(pointCPU);
  writeApi.writePoint(pointMemory);
  writeApi.writePoint(pointDisk);
  writeApi.writePoint(pointNetwork);

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
