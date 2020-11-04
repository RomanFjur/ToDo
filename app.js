const express = require('express');
const fs = require('fs');
const StorageService = require('./services/storage.js');
const app = express();
const port = 3000;
const storageService = new StorageService();

app.use(express.static(__dirname));

app.get(`/todos`, (req, res) => {
  res.send({name: 1});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
