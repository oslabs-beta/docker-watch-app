'use strict';

const { json } = require('express');
const express = require('express');
const axios = require('axios');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.use(express.json());

app.get('/', async (req, res, next) => {
  const apiURL = process.env.API_URL || 'http://127.0.0.1:8081';
  await axios({
    method: 'get',
    url: apiURL,
    // responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then(function (response) {
      res.locals.body = `
      <h1>Frontend GUI</h1>
      <p>Frontend appears operational.</p>
      <p>Backend status is ${response.status} with text of '${response.statusText}'.</p>
    `;
      res.status(200).send(res.locals.body);
    })
    .catch(function (error) {
      console.log(error);
      next({
        log: 'API error',
        message: { err: 'Error, API unavailable from frontend' },
      });
    });
});

app.use('*', (req, res, next) => {
  next({
    log: `Page not found: ${req.baseUrl}`,
    status: 404,
    message: { err: 'Error 404: Page not Found' },
  });
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
