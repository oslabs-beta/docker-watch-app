/* eslint-disable max-len */

/** @module write
 * Writes a data point to InfluxDB using the Javascript client library with Node.js. */
const { InfluxDB } = require('@influxdata/influxdb-client');
const { Point } = require('@influxdata/influxdb-client');
const containerStats = require('./index.js');

console.log('+++++++++++++++++++++++++++++++++this is container stats in DB file ');
console.log(containerStats);

/* Environment variables * */
const token = 'dev-token';
const org = 'dev-org';
const bucket = 'dev-bucket';
const client = new InfluxDB({ url: 'http://localhost:8086', token });
/* Create a write client from the getWriteApi method.
  Provide your `org` and `bucket` */
const writeApi = client.getWriteApi(org, bucket);

/* Create a point and write it to the buffer. Apply default tags to all points. Provide tags as an object of key/value pairs that records metadata, compare tags to fields: fields are not indexed */
writeApi.useDefaultTags({ container_id: 'container_id', container_name: 'container_name' });

/* Use the Point() constructor to create a point, In InfluxDB, a point represents a single data record, similar to a row in a SQL database table. Each point: has a measurement, a tag set, a field key, a field value, and a timestamp; is uniquely identified by its series and timestamp.
In a series, each point has a unique timestamp. If you write a point to a series with a timestamp that matches an existing point, the field set becomes a union of the old and new field set, where any ties go to the new field set.
*/

// const point1 = new Point('CPU')
//   .tag('container_id', 'qwerty444')
//   .tag('container_name', 'container555')
//   .floatField('total_usage', 664433);
const pointArray = [];

for (let i = 0; i < containerStats.length; i++) {
  console.log(containerStats[i].name);
  const pointCPU = new Point('CPU')
    .tag('container_id', containerStats[i].name)
    .tag('container_name', containerStats[i].id)
    .floatField('total_usage', containerStats[i].cpu);

  // const pointMemory = new Point('Memory')
  //   .tag('container_id', containerStats[i].name)
  //   .tag('container_name', containerStats[i].id)
  //   .floatField('total_usage', containerStats[i].memory);
  console.log(pointCPU);
  // writeApi.writePoint(pointCPU, pointMemory);
  pointArray.push(pointCPU);
}
for (let i = 0; i < pointArray.length; i++) {
  writeApi.writePoint(pointArray[i]);
}
// const point2 = new Point('Memory')
//   .tag('sensor_id', 'TLM010')
//   .floatField('value', 20);

// const point3 = new Point('Memory')
//   .tag('sensor_id', 'TLM010')
//   .floatField('value', 20);

/* Use the writePoint() method to write the point to your InfluxDB bucket. Finally, use the close() method to flush all pending writes */

// writeApi.writePoint(point1);

/* Flush pending writes and close writeApi. */
writeApi
  .close()
  .then(() => {
    console.log('FINISHED');
  })
  .catch((e) => {
    console.error(e);
    console.log('Finished ERROR');
  });
