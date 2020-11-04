const express = require('express');
global.fetch = require('node-fetch');
const fs = require('fs');
const bodyParser = require('body-parser');
const StorageService = require('./services/storage.js');
const app = express();
const port = 3000;
const storageService = new StorageService();

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

app.use(express.static(__dirname));

app.post(`/todos`, urlencodedParser, (req, res) => {

  let nameTask = req.body.name;
  let tagsTask = req.body.tags;
  let user = {name: nameTask, tags: tagsTask};

  storageService.save(res.send(user));
});

// ------

app.get(`/todos`, (req, res) => {
  let content = fs.readFileSync("todos.json", "utf8");
  let users = JSON.parse(content);
  res.send(users);
});

app.get(`/todos/:toDoId`, (req, res) => {
  // let id = req.params.id; // получаем id
  // let content = fs.readFileSync("todos.json", "utf8");
  // let users = JSON.parse(content);
  // let user = null;
  //   // находим в массиве пользователя по id
  // for (var i = 0; i < users.length; i++){
  //     if(users[i].id == id){
  //         user = users[i];
  //         break;
  //     }
  // }
  //   // отправляем пользователя
  // if (user) {
  //     res.send(user);
  // } else {
  //     res.status(404).send();
  // }
});

// ------

app.put(`/todos/:toDoId`, (req, res) => {

});

app.delete(`/todos/:toDoId`, (req, res) => {

});

app.listen(port, () => {
  console.log(`Сервер подключен...`);
});
