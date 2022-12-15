const http = require('node:http');

const clientOptions = {
  socketPath: '/var/run/docker.sock',
  path: '/v1.41/containers/json',
  method: 'GET',
};

// declare array to hold container ids
const containerIds = [];

// declare an array to store the stats
const containerStats = [];

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
      console.log(container.Id);
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
      const clientStats = http.request(clientStatsOptions, (res2) => {
        let body2 = [];
        // collect the data
        res2.on('data', (chunk) => {
          body2.push(chunk);
        });
        // after collection, parse the buffer into a js object
        res2.on('end', () => {
          body2 = JSON.parse(Buffer.concat(body2));
          // console.log('_____this is body2', body2);

          // store id, name, cpu_stats.cpu_usage.total_usage, memory_stats.usage for every container
          // add these later network: body2.networks, disk: body2.blkio_stats
          containerStats.push({
            id: body2.id, name: body2.name, cpu: body2.cpu_stats.cpu_usage.total_usage, memory: body2.memory_stats.usage,
          });
          console.log('+++++++++ this is containerStats in index file', containerStats);
        });

        // TODO: add stats to the db
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

module.exports = containerStats;
