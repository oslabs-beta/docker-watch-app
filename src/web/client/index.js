 import React from 'react';
 import ReactDOM from 'react-dom/client';
 import App from './App.jsx';
 import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
     <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
  </div>
      // document.getElementById('root')
);