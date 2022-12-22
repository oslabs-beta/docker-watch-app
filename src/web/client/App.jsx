import Container from "./Container.jsx";
import GraphContainer from "./GraphContainer";
import React, { useState, useEffect } from "react";
import "./app.css";

function App() {
  const [containerList, updateContainerList] = useState([]);
  const [containerData, setContainerData] = useState({});
  //request to server to update the container list on component mount..and after every update???
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
  const containers = containerList.map((container, i) => {
    return (
      <Container
        setContainerData={setContainerData}
        key={`container-${i}`}
        id={container.id}
        text={`container-${container.name}`}
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
        //TODO: pass down CPU DATA and then   set it to be it's data. (may need to make CPU it's own folder)
        containerData={containerData}
        className="Main"
      />
    </div>
  );
}

export default App;
