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



  const callContainers = (id) => {
    clearInterval(intervalRef.current);
    console.log(`clear interval ${intervalRef.current}`)
    containerOnClick(id);
    intervalRef.current = setInterval(() => containerOnClick(id), 5000);
    console.log('new interval', intervalRef.current)
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
