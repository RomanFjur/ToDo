const fs = require('fs');
const DB_PATH = './db/todos.json';
const updateDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data), () => {});

class StorageService {
  constructor() {
    this.data = JSON.parse(fs.readFileSync(DB_PATH, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }));
    this.data = Array.isArray(this.data) ? this.data : [];
  }

  find(id) {
    if (id) {
      return this.data.find((item) => item.id === id); 
    } else {
      return this.data;
    }
  }

  save(data) {
    try {
      if (Array.isArray(data)) {
        this.data = data;
      } else {
        this.data = [...this.data, data];
      }
      updateDB(this.data);
    } catch (err) {
      console.error(err);
    }
    return data;
  }

  update(id, data) {
    const {name, tags} = data;
    const toDoIndex = this.data.findIndex((obj) => obj.id === id);

    if (toDoIndex === -1) {
      return null;
    }
    const {name: nameCurrent, tags: tagsCurrent} = this.data[toDoIndex];

    this.data[toDoIndex] = {
      ...this.data[toDoIndex],
      name: name || nameCurrent,
      tags: tags || tagsCurrent
    };

    updateDB(this.data);
    return this.data[toDoIndex];
  }

  delete(id) {
    const deletedTodo = this.data.findIndex((obj) => obj.id === id);
    this.data.splice(deletedTodo, 1);

    // Внимательно смотреть за итерацией!!!

    updateDB(this.data);
    return this.data;
  }
}

module.exports = StorageService;
