const express = require('express');
const bodyParser = require('body-parser');
const StorageService = require('./services/storage.js');
const app = express();
const port = 3000;
const storageService = new StorageService();
const IdGenerator = require('./utils.js');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post(`/todos`, (req, res) => {
  const todos = storageService.find();
  // сначала find, потом в todos добавить todo
  const {name, tags, id = IdGenerator.getNewId()} = req.body; // деструктуризация
  const todo = storageService.save({name, tags, id});
  res.send(todo);
});

app.get(`/todos`, (req, res) => {
  const todos = storageService.find();
  res.send(todos);
});

app.get(`/todos/:toDoId`, (req, res) => {
  const {name, tags, id} = req.params;
  const todos = storageService.find();
  let todo = null;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id == id) {
      todo = todo[i];
      break;
    }
  }

  if (todo) {
    res.send(todo);
  } else {
    res.status(404).send();
  }
});

// ------

app.put(`/todos/:toDoId`, (req, res) => {

});

app.delete(`/todos/:toDoId`, (req, res) => {

});

app.listen(port, () => {
  console.log(`Сервер подключен...`);
});
