import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const obj = {
  labels: [1, 2, 3], 
    datasets: [{
      label: "Users Gained",
      data: [4, 5, 6],
    }]
}
function BarChart({ chartData }) {
  return <Bar data = {chartData} />;
}

export default BarChart;
