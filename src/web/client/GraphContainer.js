import React from "react";
import LineChart from "./LineChart.js";
// format graph data for chartjs from container data
const formatGraphData = (data) => {
  const getMetricArrays = (data) => {
    const dates = [];
    const times = [];
    const CPU_total_usage = [];
    const Memory_total_usage = [];
    const Network_rx_bytes = [];
    const Network_rx_dropped = [];
    const Network_rx_errors = [];
    const Network_rx_packets = [];
    const Network_tx_bytes = [];
    const Network_tx_dropped = [];
    const Network_tx_errors = [];
    const Network_tx_packets = [];
    const Disk_read_value = [];
    const Disk_write_value = [];

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

    for (const [time, values] of Object.entries(data)) {
      const timestamp = new Date(time).toLocaleString();
      metricArrays.dates.push(timestamp.slice(0, 10));
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

  const {
    dates,
    times,
    CPU_total_usage,
    Memory_total_usage,
    Network_rx_bytes,
    Network_rx_dropped,
    Network_rx_errors,
    Network_rx_packets,
    Network_tx_bytes,
    Network_tx_dropped,
    Network_tx_errors,
    Network_tx_packets,
    Disk_read_value,
    Disk_write_value,
  } = getMetricArrays(data);

  const cpuData = {
    labels: times,
    datasets: [
      {
        label: "cpu",
        data: CPU_total_usage,
      },
    ],
  };

  const memoryData = {
    labels: times,
    datasets: [
      {
        label: "Memory_total_usage",
        data: Memory_total_usage,
      },
    ],
  };

  const networkData = {
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

  const diskData = {
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

  return [cpuData, memoryData, networkData, diskData];
};
const date = new Date().toLocaleDateString();
// creates a chart for every graph in graphData
function GraphContainer({ containerData }) {
  // cancel render if no graph data
  if (!Object.keys(containerData).length) return;
  const graphData = formatGraphData(containerData);
  // convert array of chartJS-ready graph data to BarChart elements
  const charts = graphData.map((graph, i) => {
    return (
      <div key={i}>
        <div>{date}</div>
        <LineChart graphData={graph}></LineChart>
      </div>
    );
  });
  return (
    <>
      <div className="Main inline-grid grid-cols-2 gap-1">{charts}</div>
    </>
  );
}

export default GraphContainer;
