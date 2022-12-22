import React, { useRef, useState, useEffect } from "react";


export default function Container({ id, text, setContainerData, intervalRef }) {


  // fetch container data from server
  const containerOnClick = (id) => {
    const apiURL = process.env.API_URL || "http://127.0.0.1:8081";

    fetch(`${apiURL}/api/v1/containers/${id}/stats`)
      .then((response) => response.json())
      .then((data) => {
        setContainerData(data);
      })
      .catch((err) => console.log(err));
  };


  //a function that clears the current running setInterval that is stored in useRef (see app) and the runs a new set inerval for the newly clicked container
  const callContainers = (id) => {
    //clears the value at current in useRef
    clearInterval(intervalRef.current);
    //initial call to containerOnClick to get initial metric data
    containerOnClick(id);
    //subsequent calls to containerOnClick every 5 seconds. This is stored inside of useRef to be cleared when the next container is clicked.
    intervalRef.current = setInterval(() => containerOnClick(id), 5000);
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
