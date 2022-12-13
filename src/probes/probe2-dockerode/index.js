const Docker = require('dockerode');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function listContainerIds() {
  await docker.listContainers().then((containers) => {
    for (const container of containers) {
      console.log(container.Id);
    }
  });
}

listContainerIds();
