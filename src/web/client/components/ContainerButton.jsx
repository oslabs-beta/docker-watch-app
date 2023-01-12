import React, { useEffect, useRef } from 'react';

export default function Container({
  id, text, setContainerData, intervalRef, idRef, containerRef, timeFrame,
}) {
  const prevData = useRef({});

  // fetch full container data from server
  const getInitialData = (containerId) => {
    const apiURL = process.env.API_URL || 'http://127.0.0.1:8081';

    fetch(`${apiURL}/api/v1/containers/${containerId}/stats/${timeFrame}`)
      .then((response) => response.json())
      .then((data) => {
        prevData.current = data;
        setContainerData(data);
      })
      .catch((err) => console.log(err));
  };
  // fetch partial container data from server
  const getUpdatedData = (containerId) => {
    const apiURL = process.env.API_URL || 'http://127.0.0.1:8081';

    fetch(`${apiURL}/api/v1/containers/${containerId}/stats/8s`)
      .then((response) => response.json())
      .then((data) => {
        const newContainerData = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const key of Object.keys(data)) {
          const newData = [...prevData.current[key], ...data[key]];
          newContainerData[key] = newData;
        }
        prevData.current = newContainerData;
        setContainerData(newContainerData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /* a function that clears the current running setInterval that is stored in
  useRef (see app) and the runs a new set inerval for the newly clicked container */
  const containerOnClick = (containerId, didTimeChange = false) => {
    if (containerId === idRef.current && !didTimeChange) return;
    idRef.current = containerId;
    containerRef.current = containerId;
    // clears the value at current in useRef
    clearInterval(intervalRef.current);
    // initial call to containerOnClick to get initial metric data
    getInitialData(containerId);
    /* subsequent calls to containerOnClick every 5 seconds.
    This is stored inside of useRef to be cleared when the next container is clicked. */
    intervalRef.current = setInterval(() => getUpdatedData(containerId), 5000);
  };

  useEffect(() => {
    if (idRef.current !== 0) containerOnClick(idRef.current, true);
  }, [timeFrame]);

  return (
    <button
      type='button'
      onClick={() => containerOnClick(id)}
        // if button is selected then the text color is white
      className={containerRef.current === id ? 'btn btn-active bg-m-blue hover:bg-m-blue border-white mb-1 text-white min-w-full' : 'btn btn-outline border-l-blue text-l-blue mb-1 min-w-full'}
    >
      {text}
    </button>
  );
}
