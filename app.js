const express = require('express');
const fs = require('fs');
const StorageService = require('./services/storage.js');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const storageService = new StorageService();

const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();

app.use(express.static(__dirname));

app.post(`/todos`, jsonParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);

    var userName = req.body.name;
    var userAge = req.body.age;
    var user = {name: userName, age: userAge};

    var data = fs.readFileSync("todos.json", "utf8");
    var users = JSON.parse(data);

    // находим максимальный id
    var id = Math.max.apply(Math,users.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    user.id = id+1;
    // добавляем пользователя в массив
    users.push(user);
    var data = JSON.stringify(users);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("todos.json", data);
    res.send(user);
});

// ------

app.get(`/todos`, (req, res) => {
  let content = fs.readFileSync("todos.json", "utf8");
  let users = JSON.parse(content);
  res.send(users);
});

app.get(`/todos/:toDoId`, (req, res) => {
  let id = req.params.id; // получаем id
  let content = fs.readFileSync("todos.json", "utf8");
  let users = JSON.parse(content);
  let user = null;
    // находим в массиве пользователя по id
  for (var i = 0; i < users.length; i++){
      if(users[i].id == id){
          user = users[i];
          break;
      }
  }
    // отправляем пользователя
  if (user) {
      res.send(user);
  } else {
      res.status(404).send();
  }
});

// ------

app.put(`/todos/:toDoId`, (req, res) => {
  var id = req.params.id;
    var data = fs.readFileSync("todos.json", "utf8");
    var users = JSON.parse(data);
    var index = -1;
    // находим индекс пользователя в массиве
    for(var i=0; i<users.length; i++){
        if(users[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем пользователя из массива по индексу
        var user = users.splice(index, 1)[0];
        var data = JSON.stringify(users);
        fs.writeFileSync("todos.json", data);
        // отправляем удаленного пользователя
        res.send(user);
    }
    else{
        res.status(404).send();
    }
});

app.delete(`/todos/:toDoId`, (req, res) => {
  if(!req.body) return res.sendStatus(400);

    var userId = req.body.id;
    var userName = req.body.name;
    var userAge = req.body.age;

    var data = fs.readFileSync("todos.json", "utf8");
    var users = JSON.parse(data);
    var user;
    for(var i=0; i<users.length; i++){
        if(users[i].id==userId){
            user = users[i];
            break;
        }
    }
    // изменяем данные у пользователя
    if(user){
        user.age = userAge;
        user.name = userName;
        var data = JSON.stringify(users);
        fs.writeFileSync("todos.json", data);
        res.send(user);
    }
    else{
        res.status(404).send(user);
    }
});

app.listen(port, () => {
  console.log(`Сервер подключен...`);
});
