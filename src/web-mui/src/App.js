import logo from "./logo.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Header from "./Header.js";
//import chart from "./chartjs/src/acquisitions";
import BarChart from "./BarChart.js";
import { useState } from "react";
function App() {
  const datas = [
    { cpu: 2010, time: 30 },
    { cpu: 2011, time: 20 },
    { cpu: 2012, time: 15 },
    { cpu: 2013, time: 25 },
    { cpu: 2014, time: 22 },
    { cpu: 2015, time: 30 },
    { cpu: 2016, time: 28 },
  ];
  
  const [userData, setUserData] = useState({
    labels: datas.map((data) => {
      console.log(data)
      return data.cpu;
      }), 
      datasets: [{
        label: "Users Gained",
        data: datas.map((data) => data.time),
      }]
    })
  console.log('userData:', userData);
  const buttons = [];
  for (let i = 0; i <= 9; i++) {
    const button = (
      <Button id={i} className="Container" variant="outlined">
        <h2 className="whale">🐳</h2>Container {i + 1}
      </Button>
    );
    buttons.push(button);
  }
  return (
    <div className="App">
      <header className="Header">
        <h1>DockerVision</h1>
      </header>
      <Grid
        className="Main"
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid xs={6}>
          <BarChart chartData={userData}/>
        </Grid>
        <Grid xs={6}>
          <div style={{ "fontSize": "116px" }}>2🐳📊</div>
        </Grid>
        <Grid xs={6}>
          <div style={{ "fontSize": "116px" }}>3🐳📊</div>
        </Grid>
        <Grid xs={6}>
          <div style={{ "fontSize": "116px" }}>4🐳📊</div>
        </Grid>
      </Grid>
      <div className="Sidebar">
        <Stack spacing={2}>{buttons}</Stack>
      </div>
    </div>
  );
}

export default App;
