import React, { useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import LineChart from '../components/LineChart';
// format graph data for chartjs from container data
const formatGraphData = (data) => {
  // iterates over metric arrays and returns smaller data subset based on adjustment
  // const adjustTimeFrame = (metrics, adjustment) => {
  //   const metricsCopy = { ...metrics };
  //   // eslint-disable-next-line no-restricted-syntax, guard-for-in
  //   for (const key in metricsCopy) {
  //     // const newArr = [];
  //     // for (let j = metricsCopy[key].length - 1; j >= 0; j -= adjustment) {
  //     //   newArr.push(metricsCopy[key][j]);
  //     // }
  //     // metricsCopy[key] = newArr;
  //     console.log(metricsCopy);
  //     const newArr = [];
  //     for (let j = 0; j > metricsCopy[key].length; j += adjustment) {
  //       newArr.push(metricsCopy[key][j]);
  //     }
  //     metricsCopy[key] = newArr;
  //   }
  //   return metricsCopy;
  // };
  // let adjustmentFactor = 1
  // if (data.times.length / adjustmentFactor > 20) adjustmentFactor += 1
  // const timeFrames = {
  //   '5 seconds': 1,
  //   '30 seconds': 6,
  //   '1 minute': 12,
  //   '5 minutes': 60,
  //   '30 minutes': 360,
  //   '1 hour': 720,
  // };
  // console.log('timeframe inside graph display', timeFrame.current);
  // const adjustmentFactor = timeFrames[timeFrame.current];
  // const metrics = adjustTimeFrame(data, 1);
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
  } = data;

  const cpuData = {
    labels: times,
    datasets: [
      {
        label: 'cpu_percentage',
        data: cpu_percentage,
      }
    ],
  };
  // formats for each data chart with their respective metric data/
  const memoryData = {
    labels: times,
    datasets: [
      {
        label: 'Memory_usage',
        data: Memory_memory_usage,
      }
    ],
  };

  const networkData = {
    labels: times,
    datasets: [
      {
        label: 'Network_input',
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
        label: 'Network_output',
        data: Network_tx_bytes,
      }
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
        label: 'Disk_read_value',
        data: Disk_read_value,
      },
      {
        label: 'Disk_write_value',
        data: Disk_write_value,
      }
    ],
  };

  return [cpuData, memoryData, networkData, diskData];
};
// const date = new Date().toLocaleDateString();
// creates a chart for every graph in graphData
function GraphContainer({ containerData, timeFrame }) {
  // useEffect(() => {

  // }, [timeFrame.current]);
  // cancel render if no graph data
  if (!Object.keys(containerData).length) {
    return <div className='Main inline-grid grid-cols-2 gap-1' />;
  }
  const graphData = formatGraphData(containerData, timeFrame);
  const titles = ['CPU', 'Memory', 'Network', 'Disk'];
  // convert array of chartJS-ready graph data to BarChart elements
  const charts = graphData.map((graph, i) => (
    // TODO investigate visual bug when using uuid
    // eslint-disable-next-line react/no-array-index-key
    <div key={i}>
      <LineChart graphData={graph} title={titles[i]} />
    </div>
  ));
  return <div className='Main inline-grid grid-cols-2 gap-1'>{charts}</div>;
}

export default GraphContainer;
