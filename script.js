class ToDoForm {
  constructor (selector, onSubmit = () => {}) {
    this.selector = selector;
    this.onSubmit = onSubmit;
    this.rootElement = selector();
  }

  createForm () {
    let form = document.createElement('form');
    form.classList.add('form');
    this.rootElement.append(form);
    this.form = form;

    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'My new todo';
    nameInput.classList.add('input');
    this.form.append(nameInput);
    nameInput.addEventListener('input', (e) => {
      this.valueName = e.target.value;
      console.log(this.valueName);
    });
    this.nameInput = nameInput;

    let tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'todo, important, other...';
    tagsInput.classList.add('input');
    this.form.append(tagsInput);
    tagsInput.addEventListener('input', (e) => {
      this.valueTags = e.target.value;
      console.log(this.valueTags);
    });
    this.tagsInput = tagsInput;

    let submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Create';
    submitButton.classList.add('button');
    submitButton.addEventListener('click', () => {
      this.onSubmit({name: this.valueName, tags: this.valueTags});
      this.cleanInputs();
    });
    this.form.append(submitButton);
    this.submit = submitButton;
  }

  cleanInputs () {
    this.nameInput.value = '';
    this.tagsInput.value = '';
  }
}

function onSubmit (obj) {
  console.log(obj);
  return obj;
}

let toDoForm = new ToDoForm(() => document.querySelector('body'), onSubmit);

// --------------------------------------
// Это будет работать в последнем классе!
toDoForm.createForm();
// --------------------------------------

class ToDoList {
  constructor(selector, initialState = []) {
    this.selector = selector;
    this.toDoItems = [...initialState];
  }

  // get toDoItems() {
  //   return this.toDoItems;
  // }
  //
  // set toDoItems(value) {
  //   this.toDoItems = value;
  //   this.checkIsEmpty();
  //   console.log('проверка');
  // }

  checkIsEmpty() {
    // 1. проверить длинну массива
    // 2. если дринна 0 - очистить контейнер, отрендерить строку с текстом
    // 3. иначе ничего
  }

  renderEmptyLabel() {

  }

  renderToDoItems() {

  }

  renderToDoItem() {

  }

  addToDoItem() {

  }

  createList () {
    let list = document.createElement('div');
    list.classList.add('list');
    this.selector.append(list);
  }

}

let toDoList = new ToDoList(document.querySelector('body'));
toDoList.createList();

class ToDosHandle {
  constructor() {

  }
}
