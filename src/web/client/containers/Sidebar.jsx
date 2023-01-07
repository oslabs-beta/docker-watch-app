import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Container from '../components/ContainerButton';

export default function Sidebar({ containerData, setContainerData }) {
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
    getContainers();
  }, []);
  // iterates through contaierList and returns an array of container buttons to render to sidebar
  const containers = containerList.map((container, i) => (
    <Container
      setContainerData={setContainerData}
      containerData={containerData}
      key={`container ${i}`}
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
        {containers}
      </div>
    </section>
  );
}
