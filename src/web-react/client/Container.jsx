import React, { useEffect, useState } from 'react';
import BarChart from "./BarChart.js";


export default function Container({ id, text, setUserData, setCPUChart }) {


  //TODO: on click the current container's id will be passed into containerOnClick whcih will make a fetch request to the enpoint for that container to get timestamped data and pass into setCPUChart to update state
  const containerOnClick = (id) => {
    console.log(id)
    fetch(`http://localhost:8081/api/container/${id}`)
      .then(response => response.json())
      .then(data => {
        // console.log("Data: ", data)
        setCPUChart(data)
      })
      .catch(err => console.log(err))
    // setUserData(id);
  }
  return (
    <>
      <button onClick={() => containerOnClick(id)} className="btn btn-outline btn-accent min-w-full">{text}</button>
    </>
  )
}