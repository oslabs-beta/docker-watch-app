import BarChart from "./BarChart.js";
import Container from "./Container.jsx";
import React, { useState, useEffect } from "react";

// format graph data for chartjs from container data
const formatGraphData = (data) => {

  const times = Object.keys(data);
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

  for (const time of Object.values(data)) {
    CPU_total_usage.push(time.CPU_total_usage);
    Memory_total_usage.push(time.Memory_total_usage);

    Network_rx_bytes.push(time.Network_rx_bytes);
    Network_rx_dropped.push(time.Network_rx_dropped);
    Network_rx_errors.push(time.Network_rx_errors);
    Network_rx_packets.push(time.Network_rx_packets);

    Network_tx_bytes.push(time.Network_tx_bytes);
    Network_tx_dropped.push(time.Network_tx_dropped);
    Network_tx_errors.push(time.Network_tx_errors);
    Network_tx_packets.push(time.Network_tx_packets);

    Disk_read_value.push(time.Disk_read_value);
    Disk_write_value.push(time.Disk_write_value);
  }

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
  return Object.keys(datasets).map((dataset) => {
    return {
      labels: data.map((el) => {
        return el.time;
      }),
      datasets: [
        {
          label: dataset,
          data: data.map((el) => {
            return el[datasets[dataset]];
          }),
        },
      ],
    };
  });
};
// ORIGINAL:
// format graph data for chartjs from container data
// const formatGraphData = (data) => {
//   if (!data[0]) return;
//   const datasets = {
//     cpu: "cpu_total_usage",
//     memory: "memory_total_usage",
//   };
//   return Object.keys(datasets).map((dataset) => {
//     return {
//       labels: data.map((el) => {
//         return el.time;
//       }),
//       datasets: [
//         {
//           label: dataset,
//           data: data.map((el) => {
//             return el[datasets[dataset]];
//           }),
//         },
//       ],
//     };
//   });
// };
// creates a chart for every graph in graphData
function GraphContainer({ containerData }) {
  // cancel render if no graph data
  if (!containerData?.length) return;
  const graphData = formatGraphData(containerData);
  // convert array of chartJS-ready graph data to BarChart elements
  const charts = graphData.map((graph, i) => {
    return (
      <div key={i}>
        <BarChart graphData={graph}></BarChart>
      </div>
    );
  });
  return <div className="Main inline-grid grid-cols-2 gap-1">{charts}</div>;
}

export default GraphContainer;
