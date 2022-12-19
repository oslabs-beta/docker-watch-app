const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000

app.use(express.json());

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error caught in unknown middleware error',
    status: 400,
    message: { err: 'an error occured' }
  }
  const errorObj = Object.assign(defaultErr, err)
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

module.exports = app;