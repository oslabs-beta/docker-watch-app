const statCalcs = {};

// calculate CPU Percentage
statCalcs.cpuPerc = (cpuStats, preCpuStats, systemCpuStats, preSystemCpuStats, timeDelta) => {
  // console.log(typeof cpuStats);
  const cpuDelta = cpuStats - preCpuStats;
  const systemDelta = systemCpuStats - preSystemCpuStats;
  console.log(cpuDelta);
  console.log(systemDelta);
  if (cpuDelta > 0 && systemDelta > 0) {
    return ((cpuDelta / systemDelta) / timeDelta) * 100;
  } return 0;
};

// calculate Memory Percentage
statCalcs.memoryPerc = (memUsage, memLimit) => memUsage / memLimit;

module.exports = statCalcs;
