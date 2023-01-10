import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/ContainerButton';

export default function Sidebar({ containerData, setContainerData }) {
  const [containerList, updateContainerList] = useState([]);
  // const timeFrame = useRef('1h');
  const [timeFrame, setTimeFrame] = useState('1h');
  const [timeDisplay, setTimeDisplay] = useState('Past 1 hour');
  /* contains the current running setInterval calling the
  function that requests the api for metric data for the last clicked container. */
  const intervalRef = useRef(0);
  const idRef = useRef(0);

  // a hook to highlight the selected container
  const containerRef = useRef('');
  // makes request to api for list of current running containers
  const getContainers = () => {
    const apiURL = process.env.API_URL || 'http://127.0.0.1:8081';

    fetch(`${apiURL}/api/v1/containers`)
      .then((response) => response.json())
      .then((data) => {
        updateContainerList(data);
      })
      .catch((err) => console.log(err));
  };

  // calls getContainers on mount
  useEffect(() => {
    getContainers();
  }, []);

  const timeRangeClicked = (str) => {
    setTimeFrame(str);

    const times = {
      '1m': 'past 1 minute',
      '5m': 'past 5 minutes',
      '1h': 'past 3 hours',
      '3h': 'past 4 hours',
      '6h': 'past 6 hours',
      '12h': 'past 12 hours',
      '1d': 'past 1 day',
      '7d': 'past 7 days',
    };

    setTimeDisplay(times[str]);
  };

  // iterates through contaierList and returns an array of container buttons to render to sidebar
  const containerButtons = containerList.map((container) => (
    <Container
      setContainerData={setContainerData}
      containerData={containerData}
      key={`containerButton-${container.id}`}
      id={container.id}
      text={`container-${container.name}`}
      intervalRef={intervalRef}
      idRef={idRef}
      containerRef={containerRef}
      timeFrame={timeFrame}
    />
  ));
  return (
    <aside className='Sidebar bg-slate-900'>
      <div className='pt-2'>
        <div className='dropdown dropdown-hover min-w-full block'>
          <label tabIndex={0} className='btn mb-1 min-w-full border-white'>
            🕐 &nbsp;
            {' '}
            {timeDisplay}
          </label>
          <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
            <li onClick={() => timeRangeClicked('1m')}><a>Past 1 minute</a></li>
            <li onClick={() => timeRangeClicked('5m')}><a>Past 5 minutes</a></li>
            <li onClick={() => timeRangeClicked('1h')}><a>Past 1 hour</a></li>
            <li onClick={() => timeRangeClicked('3h')}><a>Past 3 hours</a></li>
            <li onClick={() => timeRangeClicked('6h')}><a>Past 6 hours</a></li>
            <li onClick={() => timeRangeClicked('12h')}><a>Past 12 hours</a></li>
            <li onClick={() => timeRangeClicked('1d')}><a>Past 1 day</a></li>
            <li onClick={() => timeRangeClicked('7d')}><a>Past 7 days</a></li>
          </ul>
        </div>
        <div className='overflow-y-scroll sticky top-0 sideScroll'>
          {containerButtons}
        </div>
      </div>
    </aside>
  );
}
