import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/ContainerButton';

export default function Sidebar({ containerData, setContainerData, timeFrame }) {
  const [containerList, updateContainerList] = useState([]);

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
    console.log('testingggg')
    getContainers();
  }, []);

  const setTimeFrame = (e) => {
    console.log('inside setTimeframe')
    timeFrame.current = e;
    console.log(timeFrame.current)
  }
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
    />
  ));
  return (
    <section className='Sidebar bg-slate-900'>
      <div className='pt-2'>
      <div className="dropdown dropdown-right min-w-full block">
        <label tabIndex={0} className="btn m-1">Change time frame</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a onClick={console.log('hi')}>5s</a></li>
          <li onClick={(e) => setTimeFrame(e.value)}><a>30s</a></li>
          <li onClick={(e) => setTimeFrame(e.value)}><a>1m</a></li>
          <li onClick={(e) => setTimeFrame(e.value)}><a>5m</a></li>
          <li onClick={(e) => setTimeFrame(e.value)}><a>30m</a></li>
          <li onClick={(e) => setTimeFrame(e.value)}><a>1h</a></li>
        </ul>
      </div>
        {containers}
      </div>
    </section>
  );
}
