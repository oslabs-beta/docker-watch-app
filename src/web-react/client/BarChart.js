import React from "react";
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";


function BarChart({ chartData }) {
  return <Bar className="w-20" data={chartData} />;
}

export default BarChart;