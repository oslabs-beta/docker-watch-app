import React, { useRef } from "react";


export default function Container({ id, text, setContainerData, intervalRef, idRef }) {  
  const prevData = useRef({});
  // fetch full container data from server
  const getInitialData = (id) => {
    const apiURL = process.env.API_URL || "http://127.0.0.1:8081";

    fetch(`${apiURL}/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        prevData.current = data;
        setContainerData(data);
      })
      .catch((err) => console.log(err));
  };
  // fetch partial container data from server
  const getUpdatedData = (id) => {
    const apiURL = process.env.API_URL || "http://127.0.0.1:8081";

    fetch(`${apiURL}/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        const newContainerData = {};
        for (const key of Object.keys(data)) {
          const newData = [...prevData.current[key], ...data[key]];
          newContainerData[key] = newData;
        };
        prevData.current = newContainerData;
        setContainerData(newContainerData); 
      })
      .catch((err) => console.log(err));
  };

  //a function that clears the current running setInterval that is stored in useRef (see app) and the runs a new set inerval for the newly clicked container
  const containerOnClick = (id) => {
    if (id === idRef.current) return;
    idRef.current = id;
    //clears the value at current in useRef
    clearInterval(intervalRef.current);
    //initial call to containerOnClick to get initial metric data
    getInitialData(id);
    //subsequent calls to containerOnClick every 5 seconds. This is stored inside of useRef to be cleared when the next container is clicked.
    intervalRef.current = setInterval(() => getUpdatedData(id), 5000);
  }
  return (
    <>
      <button
        onClick={() => containerOnClick(id)}
        className="btn btn-outline btn-accent min-w-full"
      >
        {text}
      </button>
    </>
  );
}
