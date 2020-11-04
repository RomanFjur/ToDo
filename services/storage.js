class StorageService {
  constructor() {
    // 1. считать файл
    // 2. записать его в this.data
  }

  find(id) {
    // либо брать id (если есть) и находить todo по id
    // если нет id возвращать this.data
  }

  save(todos) {
    // записать в this.data
    // записать в файл
  }

  update(todo) {
    // обновить в this.data
    // обновленный this.data сохранить в файл 
  }
}

module.exports = StorageService;
