import BarChart from "./BarChart.js";
import Container from "./Container.jsx";
import React, { useState, useEffect } from "react";
// format graph data for chartjs from container data
const formatGraphData = (data) => {
  if (!data[0]) return;
  const datasets = {
    cpu: "cpu_total_usage",
    memory: "memory_total_usage",
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
