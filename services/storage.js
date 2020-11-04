class StorageService {
  constructor() {
    this.data = [];
  }

  find(data) {

    // либо брать id (если есть) и находить todo по id
    // если нет id возвращать this.data
  }

  save(todos) {
    async function postData(url = '', todos = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todos)
      });
      return await response.json();
    }

    postData('/todos.json', todos)
      .then((todos) => {
        console.log(todos);
      });
  }

  update(todo) {
    // обновить в this.data
    // обновленный this.data сохранить в файл
  }

  delete() {

  }
}

module.exports = StorageService;
