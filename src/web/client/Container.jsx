import React, { useRef, useState, useEffect } from "react";

export default function Container({ id, text, setContainerData }) {
  const [containerCalled, setContainerCalled] = useState(false)
  // fetch container data from server
  const containerOnClick = (id) => {
    fetch(`http://localhost:8081/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        console.log(id)
        console.log('data: ', data)
        console.log(intervalRef, intervalRef.current)
        setContainerData(data);
        // setContaienrCalled(true)
      })
      // .then(callContainers(id))
      .catch((err) => console.log(err));
  };
  const intervalRef = useRef(0);

  const callContainers = (id) => {
    const interval = setInterval(() => containerOnClick(id), 5000);
    // console.log('hello')
    // const statInterval = setInterval(() => containerOnClick(id), 5000);
    // const clearInterval = clearInterval(statInterval)
    // if (containerCalled === false) {
    //   setContainerCalled(true)
    //   containerOnClick(id);
    //   statInterval();
    //   // setInterval(() => containerOnClick(id), 5000);
    // } {
    //   clearInterval();
    //   containerOnClick(id);
    //   statInterval();
    // }
    // if (intervalRef.current) clearInterval(intervalRef.current);
    // containerOnClick(id);
    // intervalRef.current = setInterval(() => containerOnClick(id), 5000);
  }
  return (
    <>
      <button
        onClick={() => callContainers(id)}
        className="btn btn-outline btn-accent min-w-full"
      >
        {text}
      </button>
    </>
  );
}
