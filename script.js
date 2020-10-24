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
      this.setOnSubmit({name: this.valueName, tags: this.valueTags});
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

  setOnSubmit(obj) {
    let arr = [];
    arr.push(obj);
    toDoList.addToDoItem(arr);
  }
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

  // все равно не работает =(

  get toDoItems (){
    return this._toDoItems;
  }

  set toDoItems(value) {
    this._toDoItems = value;
    this.checkIsEmpty();
  }

  checkIsEmpty() {
    if (!this.toDoItems || this.toDoItems.length === 0) {
      this.renderEmptyLabel();
    }
  }

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
    this.deleteEmptyLabel();

    const toDo = document.createElement('div'),
          toDoCheckbox = document.createElement('input'),
          toDoDiv = document.createElement('div'),
          toDoName = document.createElement('p'),
          toDoTags = document.createElement('p'),
          toDoDeleteButton = document.createElement('button');

    toDoCheckbox.type = 'checkbox';

    toDo.classList.add('toDo');
    toDoCheckbox.classList.add('checkbox');
    toDoDiv.classList.add('toDoItem');
    toDoName.classList.add('name');
    toDoTags.classList.add('tags');
    toDoDeleteButton.classList.add('delete');

    // Продумать итерацию по массиву
    toDoName.textContent = `${this.toDoItems[0].name}`;
    toDoTags.textContent = `${this.toDoItems[0].tags.replace(/^/, '#').replace(/\,\s/gi, ' #')}`;

    this.list.append(toDo);
    toDo.append(toDoCheckbox);
    toDo.append(toDoDiv);
    toDoDiv.append(toDoName);
    toDoDiv.append(toDoTags);
    toDo.append(toDoDeleteButton);
  }

  // Неправильно, но пока как кастыль
  addToDoItem(arr) {
    this.toDoItems = arr;
    this.renderToDoItem();
  }
}

let toDoForm = new ToDoForm(() => document.querySelector('body'));
let toDoList = new ToDoList(() => document.querySelector('body'));