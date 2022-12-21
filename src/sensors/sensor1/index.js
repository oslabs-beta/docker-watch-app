require('dotenv').config({ path: '../../../.env' });

const http = require('node:http');
const dbFunc = require('./dbInsert');

const getContainerIDsAndWriteToDB = () => {
  const containerIds = [];

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
            if (!statsBody) return;

            try {
              dbFunc({
                // CPU metrics:
                // total usage and previous usage (process time)
                cpu_usage: statsBody.cpu_stats.cpu_usage.total_usage,
                precpu_usage: statsBody.precpu_stats.cpu_usage.total_usage,
                // system total usage
                system_cpu_usage: statsBody.cpu_stats.system_cpu_usage,
                system_precpu_usage: statsBody.precpu_stats.system_cpu_usage,

                // Disk utilization (Read and Write)
                disk_read: statsBody.blkio_stats.io_service_bytes_recursive[0].value,
                disk_write: statsBody.blkio_stats.io_service_bytes_recursive[1].value,

                // Container ID
                id: statsBody.id,

                // Memory stats:
                // memory limit
                memory_limit: statsBody.memory_stats.limit,
                // memory total usage
                memory_usage: statsBody.memory_stats.usage,

                // Container Name
                name: statsBody.name,

                // Read and Preread timestamps:
                time_delta: (Date.parse(statsBody.read) - Date.parse(statsBody.preread)),
                parsed_read: (Date.parse(statsBody.read)),
                parsed_preread: (Date.parse(statsBody.preread)),

                // Network I/O:
                // displays the amount of received data
                rx_bytes: statsBody.networks.eth0.rx_bytes,
                // number of dropped packets for received data
                rx_dropped: statsBody.networks.eth0.rx_dropped,
                // displays the number of RX errors
                rx_errors: statsBody.networks.eth0.rx_errors,
                // displays the number of received packets
                rx_packets: statsBody.networks.eth0.rx_packets,
                // displays the amount of transmitted data
                tx_bytes: statsBody.networks.eth0.tx_bytes,
                // number of dropped packets for transmitted data
                tx_dropped: statsBody.networks.eth0.tx_dropped,
                // displays the number of TX errors
                tx_errors: statsBody.networks.eth0.tx_errors,
                // displays the number of transmitted packets
                tx_packets: statsBody.networks.eth0.tx_packets,
              });
            } catch (error) {
              console.log(error);
            }
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

const getLookupFrequency = () => {
  const defaultMinimumLookupInMS = 5000;
  const envLookupFrequency = Number(process.env.SENSORS_SENSOR1_LOOKUP_FREQUENCY);

  if (Number.isNaN(envLookupFrequency) || envLookupFrequency < defaultMinimumLookupInMS) {
    return defaultMinimumLookupInMS;
  }
  return envLookupFrequency;
};

setInterval(getContainerIDsAndWriteToDB, getLookupFrequency());
