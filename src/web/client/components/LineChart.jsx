import React from 'react';
// import { Chart } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

function LineChart({ graphData, title }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        font: {
          size: 20,
        },
        text: title,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.02,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };
  return <Line className='w-full h-full px-2.5' data={graphData} options={options} />;
}

export default LineChart;
