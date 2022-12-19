import React, { useEffect, useState } from 'react';
import BarChart from "./BarChart.js";


export default function Container({ id, text, setContainerData }) {
  // fetch container data from server
  const containerOnClick = (id) => {
    fetch(`http://localhost:8081/api/container/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setContainerData(data);
      })
      .catch(err => console.log(err))
  }
  return (
    <>
      <button onClick={() => containerOnClick(id)} className="btn btn-outline btn-accent min-w-full">{text}</button>
    </>
  )
}