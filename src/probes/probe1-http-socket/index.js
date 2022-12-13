const http = require('node:http');

const clientOptions = {
  socketPath: '/var/run/docker.sock',
  path: '/v1.41/containers/json',
  method: 'GET',
};

const client = http.request(clientOptions, (res) => {
  let body = [];

  res.on('data', (chunk) => {
    body.push(chunk);
  });

  res.on('end', () => {
    body = JSON.parse(Buffer.concat(body));

    for (const container of body) {
      console.log(container.Id);
    }
  });
});

client.on('error', (err) => {
  console.log(err);
});

client.end();
