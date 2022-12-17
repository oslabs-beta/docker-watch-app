import BarChart from "./BarChart.js";
import Container from "./Container.jsx"
import GraphContainer from "./GraphContainer";
import React, { useState, useEffect } from "react";
import './App.css';
// import './dist/output.css'

function App() {
  const datas = [
    { cpu: 2010, time: 30 },
    { cpu: 2011, time: 40 },
    { cpu: 2012, time: 15 },
    { cpu: 2013, time: 25 },
    { cpu: 2014, time: 22 },
    { cpu: 2015, time: 30 },
    { cpu: 2016, time: 28 },
  ];

  const [containerList, updateContainerList] = useState([]);
  const [userData, setUserData] = useState({
    labels: datas.map((data) => {
      return data.cpu;
    }),
    datasets: [{
      label: "Users Gained",
      data: datas.map((data) => data.time),
    }]
  })
  //TODO: grap data from clicked container and add the correct lables/datasets that will be passed down to GraphContianer which will render the correct chart
  const [CPUChart, setCPUChart] = useState((data) => {
    return {
      labels: datas.map((data) => {
        return data.cpu;
      }),
      datasets: [{
        label: "CPU",
        data: datas.map((data) => data.time),
      }]
    }
  })

  //request to server to update the container list on component mount..and after every update???
  useEffect(() => {
    getContainers()
  });

  const getContainers = () => {
    fetch('http://localhost:8081/api/containers')
      .then(response => response.json())
      .then(data => {
        // console.log("Data: ", data)
        updateContainerList(data)
      })
      .catch(err => console.log(err))
  }
  // const getContainers = () 
  const containers = [];
  //loops through the container list and pushes new container div into containers array
  for (let i = 0; i < containerList.length; i++) {
    containers.push(<Container
      setUserData={setUserData}
      setCPUChart={setCPUChart}
      key={`container-${i}`}
      id={containerList[i].id}
      text={`container-${containerList[i].name}`}
    />)
  }
  return (
    <div className="App bg-slate-800">
      <header className="Header bg-sky-600 font-mono inline-block align-middle text-5xl pl-4 text-white">
        <h1>DockerWatch 🐳</h1>
      </header>
      <section className="Sidebar bg-slate-900" >
        <div className="pt-2">
          {containers}
          <button className="btn btn-outline btn-accent min-w-full">All Containers</button>
        </div>
      </section>
      <GraphContainer
        //TODO: pass down CPU DATA and then set it to be it's data. (may need to make CPU it's own folder)
        userData={userData}
        CPUChart={CPUChart} className="Main" />
      {/* <div className='Main inline-grid grid-cols-2 gap-1' >
        <div>
          <BarChart chartData={userData} />
        </div>
        <div>
          <BarChart chartData={userData} />
        </div>
        <div>
          <BarChart chartData={userData} />
        </div>
        <div>
          <BarChart chartData={userData} />
        </div>
      </div> */}
    </div>
  );
}

export default App;