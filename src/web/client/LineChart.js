import React from "react";
// import { Chart } from "react-chartjs-2";
// import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "chart.js/auto"; //replaced line 2 with this
import { Line } from "react-chartjs-2";
// import * as zoom from "chartjs-plugin-zoom"
// import "chartjs-plugin-zoom"
import zoomPlugin from 'chartjs-plugin-zoom'
Chart.register(zoomPlugin);

function LineChart({ graphData, title }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        font: {
          size: 20
        },
        text: title
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed: 0.04
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        }
      }
    }
  }
  return <Line className="w-20" data={graphData} options={options} />
}

export default LineChart;
