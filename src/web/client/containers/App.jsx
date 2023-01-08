import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import GraphContainer from './GraphDisplay';
import '../app.css';

function App() {
  // state that contains metric data on the currently clicked container
  const [containerData, setContainerData] = useState({});
  const timeFrame = useRef('5s');

  return (
    <div className='App bg-slate-800'>
      <header className='Header bg-sky-600 font-sans inline-block align-middle text-5xl pl-4 text-white'>
        <h1>DockerWatch⏱</h1>
      </header>
      <Sidebar
        containerData={containerData}
        setContainerData={setContainerData}
        timeFrame={timeFrame}
      />
      <GraphContainer
        containerData={containerData}
        timeFrame={timeFrame}
        className='Main'
      />
    </div>
  );
}

export default App;
