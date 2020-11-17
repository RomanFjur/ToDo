import HTTPClient from '/services/api.js';

const client = new HTTPClient('http://localhost:3000');

const endpointGetToDos = client.endpoint('GET', '/todos', {normalizer: (data) => {}});
const endpointCreateToDo = client.endpoint('POST', '/todos');
const endpointUpdateToDo = client.endpoint('PUT', '/todos/:toDoId');
const endpointDeleteToDo = client.endpoint('DELETE', '/todos/:toDoId');

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
    nameInput.name = 'name';
    nameInput.placeholder = 'My new todo';
    nameInput.classList.add('input');
    this.form.append(nameLabel);
    nameLabel.append(nameInput);

    nameInput.addEventListener('input', (e) => {
      this.valueName = e.target.value;
    });

    nameInput.addEventListener('focus', () => {
      nameInput.classList.remove('inputError');
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
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'todo, important, other...';
    tagsInput.classList.add('input');
    this.form.append(tagsLabel);
    tagsLabel.append(tagsInput);

    tagsInput.addEventListener('input', (e) => {
      this.valueTags = e.target.value.split(/\s+|,\s+|,+/gi);
    });

    tagsInput.addEventListener('focus', () => {
      tagsInput.classList.remove('inputError');
    });

    this.tagsInput = tagsInput;

    // Create <button> for create ToDo items in DOM;
    let submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Create';
    submitButton.classList.add('button');

    submitButton.addEventListener('click', () => {
      if (typeof(this.valueName) === 'undefined' || this.valueName === '') {
        nameInput.classList.add('inputError');
        nameInput.placeholder = 'You must enter "todo" name';
      }  else if (typeof(this.valueTags) === 'undefined' || this.valueTags === '') {
        tagsInput.classList.add('inputError');
        tagsInput.placeholder = 'Enter at least one tag';
      } else {
        this.onSubmit({name: this.valueName, tags: this.valueTags});
        this.cleanInputs();
      }
    });
    // В отдельную функцию ^

    this.form.append(submitButton);
    this.submit = submitButton;
  }

  // clear <input>'s
  cleanInputs () {
    this.nameInput.value = '';
    this.tagsInput.value = '';
    this.valueName = '';
    this.valueTags = '';
  }

  setOnSubmit(func) {
    this.submitFunc = func;
  }

  onSubmit (obj) {
    if (this.submitFunc) {
      this.submitFunc(obj);
    }
  }
}

class ToDoList {
  constructor(selector) {
    this.selector = selector;
    this.rootElement = selector();

    let list = document.createElement('div');
    list.classList.add('list');
    this.rootElement.append(list);
    this.list = list;

    (async () => {
      this.toDoItems = await endpointGetToDos();
      this.renderToDoItems(this.toDoItems);
    })();
  }

  get toDoItems() {
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
    } else {
      this.deleteEmptyLabel();
    }
  }

  // method to render string with message about empty todolist
  renderEmptyLabel() {
    let messageOfEmpty = document.createElement('p');
    messageOfEmpty.textContent = "You don't need to do anything!";
    messageOfEmpty.classList.add('emptyList');
    this.empty = messageOfEmpty;
    this.list.append(messageOfEmpty);
  }

  deleteEmptyLabel() {
    if (this.empty) {
      this.empty.remove();
    }
  }

  renderToDoItems(toDoItems) {
    toDoItems.forEach((item) => {
      this.renderToDoItem(item,
        () => this.onMarkAsDone(item, item.id),
        () => this.removeElementById(item.id)
      );
    });
  }

  renderToDoItem(toDoItem, onMarkAsDone, removeElementById) {

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

    this.list.append(toDo);
    toDo.append(checkboxLabel);
    checkboxLabel.append(toDoCheckbox);
    checkboxLabel.append(checkboxSpan);
    toDo.append(toDoName);
    toDo.append(toDoDeleteButton);
    toDo.append(toDoTags);

    toDo.dataset.id = toDoItem.id;
    toDoName.textContent = `${toDoItem.name}`;
    toDoTags.textContent = `#${toDoItem.tags.join(' #')}`;

    toDoCheckbox.addEventListener('click', onMarkAsDone);
    toDoDeleteButton.addEventListener('click', removeElementById);

    return toDo;
  }

  onMarkAsDone(item, id) {
    document.querySelector(`[data-id="${id}"]`).classList.toggle('toDoChecked');
  }

  removeElementById(id) {
    const deleteIndex = this.toDoItems.findIndex(todo => todo.id === id);
    this.toDoItems.splice(deleteIndex, 1);

    this.toDoItems = this.toDoItems;

    document.querySelector(`[data-id="${id}"]`).remove();

    (async () => {
      await endpointDeleteToDo({toDoId: id});
    })();

    // ВСЕГДА работаем от данных! Исходя из состояния!
  }

  addElement(data) {
    const array = [...this.toDoItems, data];
    const toDoItemIndex = array.indexOf(data);
    
    const toDoItem = array[toDoItemIndex];
    const toDoElement = this.renderToDoItem(toDoItem,
      () => this.onMarkAsDone(toDoItem, toDoItem.id),
      () => this.removeElementById(toDoItem.id)
    );

    this.toDoItems = array;
  }
}

class ToDoSaver {
  getToDoItems() {
  }

  setToDoItems(array) {
  }

  removeToDoItems(id) {
  }
}

const toDoSaver = new ToDoSaver();
const toDoForm = new ToDoForm(() => document.querySelector('body'));
const toDoList = new ToDoList(() => document.querySelector('body'));


toDoForm.setOnSubmit(async (data) => {
  const todo = await endpointCreateToDo(data);
  toDoList.addElement(todo);
});