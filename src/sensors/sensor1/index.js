require('dotenv').config({ path: '../../../.env' });

const lookupFrequency = process.env.SENSORS_SENSOR1_LOOKUP_FREQUENCY < 5000
  ? 5000 : process.env.SENSORS_SENSOR1_LOOKUP_FREQUENCY;

const http = require('node:http');
const dbFunc = require('./dbInsert');

const clientOptions = {
  socketPath: '/var/run/docker.sock',
  path: '/v1.41/containers/json',
  method: 'GET',
};

// declare array to hold container ids
const containerIds = [];

const getContainerIDsAndWriteToDB = () => {
  const client = http.request(clientOptions, (res) => {
    let body = [];

    res.on('data', (chunk) => {
      body.push(chunk);
    });

    res.on('end', () => {
      body = JSON.parse(Buffer.concat(body));

      // eslint-disable-next-line no-restricted-syntax
      for (const container of body) {
        containerIds.push(container.Id);
      // console.log(container.Id);
      }

      // iterate through container ids
      containerIds.forEach((id) => {
      // set path to access the stats at the current id, specify that stats only
      // need to be collected once
        const clientStatsOptions = {
          socketPath: '/var/run/docker.sock',
          path: `/v1.41/containers/${id}/stats?stream=false`,
          method: 'GET',
        };
        // create a new client to get stats
        const clientStats = http.request(clientStatsOptions, (resStats) => {
          let statsBody = [];
          // collect the data
          resStats.on('data', (chunk) => {
            statsBody.push(chunk);
          });
          // after collection, parse the buffer into a js object
          resStats.on('end', () => {
            statsBody = JSON.parse(Buffer.concat(statsBody));

            // add stats to the db
            // TODO add these later network: statsBody.networks, disk: statsBody.blkio_stats
            dbFunc({
              cpu: statsBody.cpu_stats.cpu_usage.total_usage,
              id: statsBody.id,
              memory: statsBody.memory_stats.usage,
              name: statsBody.name,
            });
          });
        });

        clientStats.on('error', (err) => {
          console.log(err);
        });

        clientStats.end();
      });
    });
  });

  client.on('error', (err) => {
    console.log(err);
  });

  client.end();
};

// invoke this function every 10 sec to store stats in the DB
setInterval(getContainerIDsAndWriteToDB, lookupFrequency);