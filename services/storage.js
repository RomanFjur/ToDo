const fs = require('fs');
const DB_PATH = './db/todos.json';

class StorageService {
  constructor() {
    this.data = [];
  }

  find(id) {
    this.data = JSON.parse(fs.readFileSync(DB_PATH, {encoding: 'utf-8'}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }));

    let todo;

    if (id) {
      todo = this.data.filter((obj) => {
        return obj.id === id;
      });
      return todo;
    } else {
      return this.data;
    }
    // либо брать id (если есть) и находить todo по id
    // если нет id возвращать this.data
  }

  save(data) {
    let todo = data;
    // try catch
    try {
      if (Array.isArray(todo)) {
        this.data = todo;
        fs.writeFile(DB_PATH, JSON.stringify(this.data), () => {});
      } else {
        this.data.push(todo);
        fs.writeFile(DB_PATH, JSON.stringify(this.data), () => {});
      }
    } catch (err) {
      console.error(err);
    }
    // data - либо массив, либо объект
    return todo; // возвращать
  }

  update(id, data) {
    // обновить в this.data
    // обновленный this.data сохранить в файл
  }

  delete(id) {

  }
}

module.exports = StorageService;
