import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
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
      <main className="Main">Main</main>
      <div className="Sidebar">
        <Stack spacing={2}>
          {buttons}
        </Stack>
      
      </div>
    </div>
  );
}

export default App;
