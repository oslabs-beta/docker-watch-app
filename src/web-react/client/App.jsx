import React, { useEffect, useState } from 'react';
import styles from './style.scss'
import Container from './Container.jsx'

function App() {
  //list that each container that will be listed in the sidbar
  const [containerList, updateContainerList] = useState(() => []);

  //request to server to update the container list on component mount..and after every update???
  useEffect(() => {
    fetch('/api/container')
     .then(response => response.json())
     .then(data => updateContainerList(() => data))
     .catch(err => console.log('error'))
  },[]);
   

  const containers = [];
  //loops through the container list and pushes new container div into containers array
  for (let i = 0; i < containerList.length; i++) {
    containers.push(<Container
      key={`container-${i}`} 
      id={containerList[i].id}
      />)
  }
  
  return (
  <body className='grid-container'>
    <header className='header'>
      <h1>DockerWatch</h1>
    </header>
    <div className='sidebar'>{containers}</div>
    <main className='main'></main>
  </body>)
}

export default App;
