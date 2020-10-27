class ToDoForm {
  constructor (selector) {
    this.selector = selector;
    this.rootElement = selector();
    this.createForm();
  }

  createForm () {
    // Create <form> in DOM;
    let form = document.createElement('form');
    form.classList.add('form');
    this.rootElement.append(form);
    this.form = form;

    // Create <input> for name of ToDo in DOM;
    let nameLabel = document.createElement('label');
    nameLabel.for = 'name';
    nameLabel.textContent = 'Name';
    nameLabel.classList.add('label');
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.placeholder = 'My new todo';
    nameInput.classList.add('input');
    this.form.append(nameLabel);
    nameLabel.append(nameInput);
    nameInput.addEventListener('input', (e) => {
      this.valueName = e.target.value;
      console.log(this.valueName);
    });
    this.nameInput = nameInput;

    // Create <input> for tags of ToDo in DOM;
    let tagsLabel = document.createElement('label');
    tagsLabel.for = 'tags';
    tagsLabel.textContent = 'Tags';
    tagsLabel.classList.add('label');
    let tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.id = 'tags';
    tagsInput.placeholder = 'todo, important, other...';
    tagsInput.classList.add('input');
    this.form.append(tagsLabel);
    tagsLabel.append(tagsInput);
    tagsInput.addEventListener('input', (e) => {
      this.valueTags = e.target.value;
      console.log(this.valueTags);
    });
    this.tagsInput = tagsInput;

    // Create <button> for create ToDo items in DOM;
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

  // clear <input>'s
  cleanInputs () {
    this.nameInput.value = '';
    this.tagsInput.value = '';
  }

  setOnSubmit(func) {
    this.submitFunc = func;
  }

  onSubmit (obj) {
    if (this.submitFunc) {
      this.submitFunc(obj);
    }
  }
  // 1. setOnSubmit Должен принимать функцию
}

class ToDoList {
  constructor(selector, initialState = []) {
    this.selector = selector;
    this.rootElement = selector();

    let list = document.createElement('div');
    list.classList.add('list');
    this.rootElement.append(list);
    this.list = list;

    this.toDoItems = [...initialState];
  }

  get toDoItems (){
    return this._toDoItems;
  }

  set toDoItems(value) {
    this._toDoItems = value;
    this.checkIsEmpty();
  }

  // check for empty array toDoItems (if empty - call render method)
  checkIsEmpty() {
    if (!this.toDoItems || this.toDoItems.length === 0) {
      this.renderEmptyLabel();
    }
  }

  // nethod to render string with message about empty todolist
  renderEmptyLabel() {
    let messageOfEmpty = document.createElement('p');
    messageOfEmpty.textContent = "You don't need to do anything!";
    messageOfEmpty.classList.add('emptyList');
    this.empty = messageOfEmpty;
    this.list.append(messageOfEmpty);
  }

  deleteEmptyLabel() {
    this.empty.remove();
  }

  renderToDoItems() {
    // Пока не продумывал
  }

  renderToDoItem() {

    const toDo = document.createElement('div'),
          checkboxLabel = document.createElement('label'),
          checkboxSpan = document.createElement('span'),
          toDoCheckbox = document.createElement('input'),
          toDoName = document.createElement('p'),
          toDoTags = document.createElement('p'),
          toDoDeleteButton = document.createElement('button');

    toDoCheckbox.type = 'checkbox';

    toDo.classList.add('toDo');
    checkboxLabel.classList.add('checkboxLabel');
    toDoCheckbox.classList.add('checkbox');
    toDoName.classList.add('name');
    toDoTags.classList.add('tags');
    toDoDeleteButton.classList.add('delete');

    // 1. Разобрать строку tags с помощью регулярки (должен быть массивом)
    // 2. С помощью reduce собрать строку с тегами из массива с тегами

    toDoName.textContent = `${this.toDoItems[this.toDoItems.length - 1].name}`;
    toDoTags.textContent = `${this.toDoItems[this.toDoItems.length - 1].tags.replace(/^/, '#').replace(/\,\s/gi, ' #')}`;

    this.list.append(toDo);
    toDo.append(checkboxLabel);
    checkboxLabel.append(toDoCheckbox);
    checkboxLabel.append(checkboxSpan);
    toDo.append(toDoName);
    toDo.append(toDoDeleteButton);
    toDo.append(toDoTags);

    toDoDeleteButton.addEventListener('click', () => {
      //Считать сперва данные
      toDo.remove();
      console.log(this.toDoItems);
      // Чистить массив toDoItems!!!
    });

    // 1. Добавить аргумент toDoItem который использовать в качестве элемента
    // 2. Самоудаление listener
    // 3. Добавить функционал ID и его подключение к DOM-елементу и к toDoItems
  }

  addElement(data) {
    const array = [...this.toDoItems, data];
    this.toDoItems = array;
    this.renderToDoItem();
  }
}

class IdGenerator {
  static getNewId(length = 10) {
    // let newId = '';
    // const avaliableSymbols = [];
  }
}

const toDoForm = new ToDoForm(() => document.querySelector('body'));
const toDoList = new ToDoList(() => document.querySelector('body'));

toDoForm.setOnSubmit((data) => {
  toDoList.addElement(data);
});

// 1. Добавить удаление элементов
// 2. Добавить функцию GenerateNewId (реализацию)
// 3. Добавить id (в массив)
// 4. добавить функцию removeElementById (чистые функции!!! приходит только id!!!)
// 5. состояние хранить в todoItems (функция toggleIsDoneById)
