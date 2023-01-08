import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/ContainerButton';

export default function Sidebar({ containerData, setContainerData }) {
  const [containerList, updateContainerList] = useState([]);
  // const timeFrame = useRef('1h');
  const [timeFrame, setTimeFrame] = useState('1h');
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

  // iterates through contaierList and returns an array of container buttons to render to sidebar
  const containers = containerList.map((container) => (
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
    <section className='Sidebar bg-slate-900'>
      <div className='pt-2'>
        <div className='dropdown dropdown-right min-w-full block'>
          <label tabIndex={0} className='btn m-1'>Change time frame</label>
          <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'>
            <li onClick={(e) => setTimeFrame('1m')}><a>1 minute</a></li>
            <li onClick={(e) => setTimeFrame('5m')}><a>5 minutes</a></li>
            <li onClick={(e) => setTimeFrame('1h')}><a>1 hour</a></li>
            <li onClick={(e) => setTimeFrame('3h')}><a>3 hours</a></li>
            <li onClick={(e) => setTimeFrame('6h')}><a>6 hours</a></li>
            <li onClick={(e) => setTimeFrame('12h')}><a>12 hours</a></li>
            <li onClick={(e) => setTimeFrame('1d')}><a>1 day</a></li>
            <li onClick={(e) => setTimeFrame('7d')}><a>7 days</a></li>
          </ul>
        </div>
        {containers}
      </div>
    </section>
  );
}
