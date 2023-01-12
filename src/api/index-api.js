/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');

const {
  gatherMetrics,
  registerEndpoint,
  exportEndpoints,
  exportAllEndpoints,
  startMetricsServer,
} = require('express-endpoints-monitor');

const controller = require('./controller');

// console.log(controller.getStatsFromDB);

const PORT = 8854;
const HOST = '0.0.0.0';

const app = express();
app.use(cors());
app.use(gatherMetrics);

// send an object with all stats of a specific container id for the default time range
app.get('/api/v1/containers/:id/stats/', controller.getContainerStats, (req, res) => {
  res.status(200).json(res.locals.stats);
});
// send an object with all stats of a specific container id for a specific timeframe
app.get('/api/v1/containers/:id/stats/:range/', controller.getContainerStats, (req, res) => {
  res.status(200).json(res.locals.stats);
});
// send an object with specific stats of a specific container id
app.get('/api/v1/containers/:id/stats/all/:metric', controller.getContainerStats, (req, res) => {
  res.status(200).json(res.locals.stats);
});
// send an object with specific stats of a specific container id for a specified timeframe
app.get('/api/v1/containers/:id/stats/:range/:metric', controller.getContainerStats, (req, res) => {
  res.status(200).json(res.locals.stats);
});
// send an object with all running container ids and names
app.get('/api/v1/containers', controller.getContainers, (req, res) => {
  res.status(200).json(res.locals.containers);
});

app.get('/', (req, res) => {
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
  exportAllEndpoints(app);
  startMetricsServer(9993);
});
