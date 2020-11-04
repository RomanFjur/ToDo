class StorageService {
  constructor() {
    fetch('/todos.json')
      .then(response => response.json)
      .then(data => this.data = data);
    // 1. считать файл (тут должен быть fetch.api)
    // 2. записать его в this.data
    console.log(this.data);
  }

  find(id) {
    // либо брать id (если есть) и находить todo по id
    // если нет id возвращать this.data
  }

  save(todos) {
    this.data.push(todos);
  }

  update(todo) {
    // обновить в this.data
    // обновленный this.data сохранить в файл
  }

  delete() {

  }
}

module.exports = StorageService;
