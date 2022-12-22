const statCalcs = {};

// calculate CPU Percentage
statCalcs.cpuPerc = (cpuStats, preCpuStats, systemCpuStats, preSystemCpuStats, onlineCpus) => {
  // console.log(typeof cpuStats);
  const cpuDelta = cpuStats - preCpuStats;
  const systemDelta = systemCpuStats - preSystemCpuStats;
  if (cpuDelta > 0 && systemDelta > 0) {
    return ((cpuDelta / systemDelta) * onlineCpus) * 100;
  } return 0;
};

// calculate Memory Percentage
statCalcs.memoryPerc = (memUsage, memLimit) => (memUsage / memLimit) * 100;

module.exports = statCalcs;
