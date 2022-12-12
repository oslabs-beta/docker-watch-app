'use strict';

const express = require('express');
const cors = require('cors');

const PORT = 8081;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  console.log('API called');
  res.sendStatus(200);
});

app.use('*', (req, res, next) => {
  const errorObj = {
    log: 'Page not found',
    status: 404,
    message: { err: 'Error 404: Page not Found' },
  };
  next(errorObj);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };

  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);

  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
