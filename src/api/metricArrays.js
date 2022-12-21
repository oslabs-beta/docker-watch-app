// takes in data and formats as object of arrays primed for chartjs
const getMetricArrays = (data) => {
  // represent arrays as object of arrays
  const metricArrays = {
    dates: [],
    times: [],
    CPU_total_usage: [],
    Memory_total_usage: [],
    Network_rx_bytes: [],
    Network_rx_dropped: [],
    Network_rx_errors: [],
    Network_rx_packets: [],
    Network_tx_bytes: [],
    Network_tx_dropped: [],
    Network_tx_errors: [],
    Network_tx_packets: [],
    Disk_read_value: [],
    Disk_write_value: [],
  };
  // iterate over every entry of object and store in empty arrays
  // eslint-disable-next-line no-restricted-syntax
  for (const [time, values] of Object.entries(data)) {
    // format time in human readable format
    const timestamp = new Date(time).toLocaleString();
    // day date only
    metricArrays.dates.push(timestamp.slice(0, 10));
    // time only
    metricArrays.times.push(timestamp.slice(12));
    metricArrays.CPU_total_usage.push(values.CPU_total_usage);
    metricArrays.Memory_total_usage.push(values.Memory_total_usage);
    metricArrays.Network_rx_bytes.push(values.Network_rx_bytes);
    metricArrays.Network_rx_dropped.push(values.Network_rx_dropped);
    metricArrays.Network_rx_errors.push(values.Network_rx_errors);
    metricArrays.Network_rx_packets.push(values.Network_rx_packets);
    metricArrays.Network_tx_bytes.push(values.Network_tx_bytes);
    metricArrays.Network_tx_dropped.push(values.Network_tx_dropped);
    metricArrays.Network_tx_errors.push(values.Network_tx_errors);
    metricArrays.Network_tx_packets.push(values.Network_tx_packets);
    metricArrays.Disk_read_value.push(values.Disk_read_value);
    metricArrays.Disk_write_value.push(values.Disk_write_value);
  }
  return metricArrays;
};

module.exports = getMetricArrays;
