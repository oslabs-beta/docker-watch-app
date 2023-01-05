// takes in data and formats as object of arrays primed for chartjs
const getMetricArrays = (data) => {
  // represent arrays as object of arrays
  const metricArrays = {
    dates: [],
    times: [],
    cpu_percentage: [],
    Memory_memory_usage: [],
    Network_rx_bytes: [],
    // Network_rx_dropped: [],
    // Network_rx_errors: [],
    // Network_rx_packets: [],
    Network_tx_bytes: [],
    // Network_tx_dropped: [],
    // Network_tx_errors: [],
    // Network_tx_packets: [],
    Disk_read_value: [],
    Disk_write_value: [],
  };

  // save previous timestamp
  let prevTime = 0;
  // iterate over every entry of object and store in empty arrays
  // eslint-disable-next-line no-restricted-syntax
  for (const [time, values] of Object.entries(data)) {
    // format time in human readable format
    const timestamp = new Date(time).toLocaleString('en-US', { timeZone: 'America/New_York' });
    if (!prevTime) prevTime = time;
    const diff = Date.parse(time) - Date.parse(prevTime);
    if (diff > 8000) {
      const dummyTimeStamp = new Date(time - 5000).toLocaleString('en-US', { timeZone: 'America/New_York' });
      metricArrays.dates.push(dummyTimeStamp.slice(0, 10));
      metricArrays.cpu_percentage.push(NaN);
      metricArrays.Memory_memory_usage.push(NaN);
      metricArrays.Network_rx_bytes.push(NaN);
      metricArrays.Network_tx_bytes.push(NaN);
      metricArrays.Disk_read_value.push(NaN);
      metricArrays.Disk_write_value.push(NaN);
    } else {
      metricArrays.dates.push(timestamp.slice(0, 10));
      // time only
      metricArrays.times.push(timestamp.slice(9));
      metricArrays.cpu_percentage.push(values.cpu_percentage);
      metricArrays.Memory_memory_usage.push(values.Memory_memory_usage);
      metricArrays.Network_rx_bytes.push(values.Network_rx_bytes);
      // metricArrays.Network_rx_dropped.push(values.Network_rx_dropped);
      // metricArrays.Network_rx_errors.push(values.Network_rx_errors);
      // metricArrays.Network_rx_packets.push(values.Network_rx_packets);
      metricArrays.Network_tx_bytes.push(values.Network_tx_bytes);
      // metricArrays.Network_tx_dropped.push(values.Network_tx_dropped);
      // metricArrays.Network_tx_errors.push(values.Network_tx_errors);
      // metricArrays.Network_tx_packets.push(values.Network_tx_packets);
      metricArrays.Disk_read_value.push(values.Disk_read_value);
      metricArrays.Disk_write_value.push(values.Disk_write_value);
    }
    prevTime = time;
    // day date only
  }
  return metricArrays;
};

module.exports = getMetricArrays;
