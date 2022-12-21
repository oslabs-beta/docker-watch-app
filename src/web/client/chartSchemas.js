import { formatGraphData } from "./GraphContainer";

export const cpuData = {
  labels: times,
  datasets: [
    {
      label: "cpu",
      data: CPU_total_usage,
    },
  ],
};

export const memoryData = {
  labels: times,
  datasets: [
    {
      label: "Memory_total_usage",
      data: Memory_total_usage,
    },
  ],
};

export const networkData = {
  labels: times,
  datasets: [
    {
      label: "Network_rx_bytes",
      data: Network_rx_bytes,
    },
    {
      label: "Network_rx_dropped",
      data: Network_rx_dropped,
    },
    {
      label: "Network_rx_errors",
      data: Network_rx_errors,
    },
    {
      label: "Network_rx_packets",
      data: Network_rx_packets,
    },
    {
      label: "Network_tx_bytes",
      data: Network_tx_bytes,
    },
    {
      label: "Network_tx_dropped",
      data: Network_tx_dropped,
    },
    {
      label: "Network_tx_errors",
      data: Network_tx_errors,
    },
    {
      label: "Network_tx_packets",
      data: Network_tx_packets,
    },
  ],
};

export const diskData = {
  labels: times,
  datasets: [
    {
      label: "Disk_read_value",
      data: Disk_read_value,
    },
    {
      label: "Disk_write_value",
      data: Disk_write_value,
    },
  ],
};