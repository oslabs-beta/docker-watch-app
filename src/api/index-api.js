/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const controller = require('./controller');

// console.log(controller.getStatsFromDB);

const PORT = 8081;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());

app.get('/', controller.getStatsFromDB, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.use('*', (req, res, next) => {
  const errorObj = {
    log: 'Page not found',
    status: 404,
    message: { err: 'Error 404: Page not Found' },
  };
  next(errorObj);
});

app.use((err, req, res) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 500,
    message: { err: 'An error occurred' },
  };
  console.log(defaultErr.log);
  res.status(defaultErr.status).send(defaultErr.message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
