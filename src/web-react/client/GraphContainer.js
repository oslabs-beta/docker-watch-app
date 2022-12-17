import BarChart from "./BarChart.js";
import Container from "./Container.jsx"
import React, { useState, useEffect } from "react";
//TODO make CPU in it's own folder and render here...see BarChart for reference
function GraphContainer({ userData }) {
  return (
    <div className='Main inline-grid grid-cols-2 gap-1' >
      <div>
        <BarChart chartData={userData} />
      </div>
      <div>
        <BarChart chartData={userData} />
      </div>
      <div>
        <BarChart chartData={userData} />
      </div>
      <div>
        <BarChart chartData={userData} />
      </div>
    </div>
  )
}

export default GraphContainer