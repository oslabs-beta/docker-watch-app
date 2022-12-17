import React from "react";
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";


function BarChart({ chartData }) {
  return <Line className="w-20" data={chartData} />;
}

export default BarChart;