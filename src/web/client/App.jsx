import Container from "./Container.jsx";
import GraphContainer from "./GraphContainer";
import React, { useState, useEffect, useRef } from "react";
import "./app.css";

function App() {
  const [containerList, updateContainerList] = useState([]);
  const [containerData, setContainerData] = useState({});
  //contains the current running setInterval calling the function that requests the api for metric data for the last clicked container.
  const intervalRef = useRef(0);
  //request to server to update the container list on with objs containing the name and id of each running containers
  useEffect(() => {
    getContainers();
  }, []);

  const getContainers = () => {
    const apiURL = process.env.API_URL || "http://127.0.0.1:8081";

    fetch(`${apiURL}/api/v1/containers`)
      .then((response) => response.json())
      .then((data) => {
        updateContainerList(data);
      })
      .catch((err) => console.log(err));
  };

  //loop through containersList and return an array containing container instances
  const containers = containerList.map((container, i) => {
    return (
      <Container
        setContainerData={setContainerData}
        key={`container-${i}`}
        id={container.id}
        text={`container-${container.name}`}
        intervalRef={intervalRef}
      />
    );
  });

  return (
    <div className="App bg-slate-800">
      <header className="Header bg-sky-600 font-mono inline-block align-middle text-5xl pl-4 text-white">
        <h1>DockerWatch 🐳</h1>
      </header>
      <section className="Sidebar bg-slate-900">
        <div className="pt-2">
          {containers}
          <button className="btn btn-outline btn-accent min-w-full">
            All Containers
          </button>
        </div>
      </section>
      <GraphContainer
        containerData={containerData}
        className="Main"
      />
    </div>
  );
}

export default App;
