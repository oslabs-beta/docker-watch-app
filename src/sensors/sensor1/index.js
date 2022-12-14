const http = require('node:http');

const clientOptions = {
  socketPath: '/var/run/docker.sock',
  path: '/v1.41/containers/json',
  method: 'GET',
};

// declare array to hold container ids
const containerIds = [];

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
          console.log(body2);
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
