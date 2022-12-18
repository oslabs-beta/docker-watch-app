import BarChart from "./BarChart.js";
import Container from "./Container.jsx";
import React, { useState, useEffect } from "react";
// creates a chart for every graph in graphData
function GraphContainer({ graphData }) {
  // cancel render if no graph data
  if (!graphData?.length) return;
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
