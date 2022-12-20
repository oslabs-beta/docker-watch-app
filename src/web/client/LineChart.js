import React from "react";
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

function LineChart({ graphData }) {
  return <Line className="w-20" data={graphData} />;
}

export default LineChart;
