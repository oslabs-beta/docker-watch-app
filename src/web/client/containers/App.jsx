import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import GraphContainer from './GraphDisplay';
import '../app.css';
// import icon from '../images/icon-no-logo.svg';

function App() {
  // state that contains metric data on the currently clicked container
  const [containerData, setContainerData] = useState({});

  return (
    <div className='App bg-slate-800'>
      <header className='Header font-sans inline-block align-middle text-5xl pl-4 text-white'>
        <h2>
          DockerWatch
          {' '}
          {/* <img src={icon} alt='' /> */}
          <svg className='inline mb-2' width='.85em' height='.85em' viewBox='0 0 255 327' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M128.5 127L112 32.8541C124.887 10.8931 132.113 12.5538 145 32.8541L128.5 127Z' fill='#D9D9D9' />
            <path d='M89.449 144.449L11.2105 89.5451C4.79446 64.9036 11.0779 60.9688 34.5451 66.2105L89.449 144.449Z' fill='#D9D9D9' />
            <path fillRule='evenodd' clipRule='evenodd' d='M162 76.7226V140H92V77.0074C103.269 73.7472 115.18 72 127.5 72C139.456 72 151.027 73.6456 162 76.7226Z' fill='#2AA79B' />
            <circle cx='127' cy='199' r='109' fill='#2B7BD4' />
            <path fillRule='evenodd' clipRule='evenodd' d='M92 77.0075C38.857 92.382 0 141.403 0 199.5C0 269.916 57.0837 327 127.5 327C197.916 327 255 269.916 255 199.5C255 141.039 215.655 91.7684 162 76.7226V95.7408C205.03 110.321 236 151.044 236 199C236 259.199 187.199 308 127 308C66.801 308 18 259.199 18 199C18 151.044 48.9696 110.321 92 95.7408V77.0075Z' fill='#D9D9D9' />
            <path fillRule='evenodd' clipRule='evenodd' d='M127.5 57C143.24 57 156 44.2401 156 28.5C156 12.7599 143.24 0 127.5 0C111.76 0 99 12.7599 99 28.5C99 44.2401 111.76 57 127.5 57ZM127.856 50.5875C139.858 50.5875 149.588 40.8581 149.588 28.8563C149.588 16.8544 139.858 7.125 127.856 7.125C115.854 7.125 106.125 16.8544 106.125 28.8563C106.125 40.8581 115.854 50.5875 127.856 50.5875Z' fill='#D9D9D9' />
            <path d='M127 253L145 316.335C130.941 331.108 123.059 329.991 109 316.335L127 253Z' fill='#D9D9D9' />
          </svg>

        </h2>
      </header>
      <Sidebar
        containerData={containerData}
        setContainerData={setContainerData}
      />
      <GraphContainer
        containerData={containerData}
        className='Main'
      />
    </div>
  );
}

export default App;
