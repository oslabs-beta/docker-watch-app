import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Header from './Header.js';
console.log(Header);
function App() {
  const buttons = [];
  for (let i = 0; i <= 9; i++) {
    const button = <Button id={i} className="Container" variant="outlined"><h2 className="whale">🐳</h2>Container {i+1}</Button>;
    buttons.push(button);
  }
  return (
    <div className="App">
      <header className="Header"><h1>DockerVision</h1></header>
      <Grid className="Main"container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <div style={{"font-size": "116px"}}>1🐳📊</div>
        </Grid>
        <Grid xs={6}>
          <div style={{"font-size": "116px"}}>2🐳📊</div>
        </Grid>
        <Grid xs={6}>
          <div style={{"font-size": "116px"}}>3🐳📊</div>
        </Grid>
        <Grid xs={6}>
          <div style={{"font-size": "116px"}}>4🐳📊</div>
        </Grid>
      </Grid>
      <div className="Sidebar">
        <Stack spacing={2}>
          {buttons}
        </Stack>
      </div>
    </div>
  );
}

export default App;
