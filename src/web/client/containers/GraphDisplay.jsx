import React from "react";
import LineChart from "../components/LineChart.jsx";
// format graph data for chartjs from container data
const formatGraphData = (data) => {
  // iterates over metric arrays and returns smaller data subset based on adjustment
  const adjustTimeFrame = (metrics, adjustment) => {
    for (const key in metrics) {
      const newArr = [];
      for (let j = metrics[key].length - 1; j >= 0; j -= adjustment) {
        newArr.push(metrics[key][j]);
      }
      metrics[key] = newArr;
    }
    return metrics;
  };
  // let adjustmentFactor = 1
  // if (data.times.length / adjustmentFactor > 20) adjustmentFactor += 1
  const metrics = adjustTimeFrame(data, 1);
  // return metrics;
  const {
    dates,
    times,
    cpu_percentage,
    Memory_memory_usage,
    Network_rx_bytes,
    // Network_rx_dropped,
    // Network_rx_errors,
    // Network_rx_packets,
    Network_tx_bytes,
    // Network_tx_dropped,
    // Network_tx_errors,
    // Network_tx_packets,
    Disk_read_value,
    Disk_write_value,
    ContainerDown,
  } = metrics;
  
  const cpuData = {
    labels: times,
    datasets: [
      {
        label: "cpu_percentage",
        data: cpu_percentage,
      },
    ],
  };
  //formats for each data chart with their respective metric data/
  const memoryData = {
    labels: times,
    datasets: [
      {
        label: "Memory_usage",
        data: Memory_memory_usage,
      },
      {
        label: "Container_is_down",
        data: ContainerDown
      }
    ],
  };

  const networkData = {
    labels: times,
    datasets: [
      {
        label: "Network_input",
        data: Network_rx_bytes,
      },
      // {
      //   label: "Network_rx_dropped",
      //   data: Network_rx_dropped,
      // },
      // {
      //   label: "Network_rx_errors",
      //   data: Network_rx_errors,
      // },
      // {
      //   label: "Network_rx_packets",
      //   data: Network_rx_packets,
      // },
      {
        label: "Network_output",
        data: Network_tx_bytes,
      },
      // {
      //   label: "Network_tx_dropped",
      //   data: Network_tx_dropped,
      // },
      // {
      //   label: "Network_tx_errors",
      //   data: Network_tx_errors,
      // },
      // {
      //   label: "Network_tx_packets",
      //   data: Network_tx_packets,
      // },
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
  const titles = ['CPU', 'Memory', 'Network', 'Disk']
  // convert array of chartJS-ready graph data to BarChart elements
  const charts = graphData.map((graph, i) => {
    return (
      <div key={i}>
        {/* <div className="date">{date}</div> */}
        <LineChart graphData={graph} title={titles[i]}></LineChart>
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