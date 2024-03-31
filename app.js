const express = require('express');
const tasksRoute = require('./routes/tasks');
const fs = require('fs');


const app = express();
const home = fs.readFileSync('./frontend/home.html');
app.use('/api/v1/tasks', tasksRoute);

app.get('/', (req, res) => {
  res.writeHead(200,{'Content-Type': 'text/html'})
  res.end(home);
});

module.exports = app;