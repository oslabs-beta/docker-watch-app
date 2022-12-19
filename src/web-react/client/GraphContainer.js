import BarChart from "./BarChart.js";
import Container from "./Container.jsx";
import React, { useState, useEffect } from "react";

const testFormatGraphData = (data) => {
  if (!Object.keys(data).length) return;
  const line = {
    cpu: ["CPU_total_usage"],
    memory: ["Memory_total_usage"],
    network: ["Network_rx_packets", "Network_tx_packets"],
    disk: ["Disk_read_value", "Disk_write_value"]
  };
  // iterate over every dataset of datasets
  // iterate over every element of dataset
  // create array of objects with label and data

  //   const datas = [{
  //     labels: time,
  //     datasets: [
  //       {
  //         label: 'cpu',
  //         data: [],
  //       },
  //     ],
  //   },
  //   {
  //     labels: time,
  //     datasets: [
  //       {
  //         label: 'network',
  //         data: [],
  //       },
  //     ],
  //   }
  // ]

  // for (const obj of Object.values(data)){
  //   for (const dataset of datas) {
  //     dataset.datasets.data.push(obj[datasets[obj.datasets.label]])
  //   }
  // }

  const graphs = Object.keys(dataLabel).map((label) => {
    const times = Object.keys(data);
    const dataType = dataLabel[label];

    const datasets = [];
    const line = {
      label: label,
      data: metricData,
    };


    const metricData = []
    for (const time of times) {
      for (const metric of dataType)
        metricData.push(data[time][metric])
    }
    console.log(dataLabel + ' ' + metricData)
    return {
      labels: times,
      datasets: [
        {
          label: label,
          data: metricData,
        },
      ],
    };
  });
  return graphs;
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
  const datas = {
    "2022-12-19T16:13:31Z": {
      "CPU_total_usage": 735481000,
      "Disk_read_value": 0,
      "Disk_write_value": 4096,
      "Memory_total_usage": 50282496,
      "Network_rx_bytes": 1764,
      "Network_rx_dropped": 0,
      "Network_rx_errors": 0,
      "Network_rx_packets": 21,
      "Network_tx_bytes": 2459,
      "Network_tx_dropped": 0,
      "Network_tx_errors": 0,
      "Network_tx_packets": 9
    },
    "2022-12-19T16:13:36Z": {
      "CPU_total_usage": 893254000,
      "Disk_read_value": 0,
      "Disk_write_value": 4096,
      "Memory_total_usage": 39804928,
      "Network_rx_bytes": 3554,
      "Network_rx_dropped": 0,
      "Network_rx_errors": 0,
      "Network_rx_packets": 40,
      "Network_tx_bytes": 6431,
      "Network_tx_dropped": 0,
      "Network_tx_errors": 0,
      "Network_tx_packets": 26
    },
    "2022-12-19T16:13:41Z": {
      "CPU_total_usage": 912700000,
      "Disk_read_value": 0,
      "Disk_write_value": 4096,
      "Memory_total_usage": 40460288,
      "Network_rx_bytes": 6058,
      "Network_rx_dropped": 0,
      "Network_rx_errors": 0,
      "Network_rx_packets": 67,
      "Network_tx_bytes": 13897,
      "Network_tx_dropped": 0,
      "Network_tx_errors": 0,
      "Network_tx_packets": 53
    },
  }
  const graphData = testFormatGraphData(datas)
  //original:
  // if (!containerData?.length) return;
  // const graphData = formatGraphData(containerData);

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
