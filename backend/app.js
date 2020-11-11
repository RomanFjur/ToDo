const express = require('express');
const bodyParser = require('body-parser');
const StorageService = require('./services/storage.js');
const app = express();
const port = 3000;
const storageService = new StorageService();
const IdGenerator = require('./utils.js');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); 
});

app.post(`/todos`, (req, res) => {
  const todos = storageService.find();
  const {name, tags, id = IdGenerator.getNewId()} = req.body;
  const todo = storageService.save({name, tags, id});
  res.send(todo);
});

app.get(`/todos`, (req, res) => {
  const todos = storageService.find();
  res.send(todos);
});

app.get(`/todos/:toDoId`, (req, res) => {
  const {toDoId} = req.params;
  const todo = storageService.find(toDoId);
  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send();
  }
});

app.put(`/todos/:toDoId`, (req, res) => {
  const {toDoId} = req.params;
  const {name, tags} = req.body;
  storageService.update(toDoId, {name, tags});
  res.send(200);
});

app.delete(`/todos/:toDoId`, (req, res) => {
  const {toDoId} = req.params;
  storageService.delete(toDoId);
  res.send(200);
});

app.listen(port, () => {
  console.log(`Сервер подключен...`);
});
