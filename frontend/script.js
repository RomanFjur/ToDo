// import './services/api.js';

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
      this.valueTags = e.target.value;
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
  constructor(selector, initialState = []) {
    this.selector = selector;
    this.rootElement = selector();

    let list = document.createElement('div');
    list.classList.add('list');
    this.rootElement.append(list);
    this.list = list;

    this.toDoItems = [...initialState];

    if (toDoSaver.getToDoItems()) {
      this.toDoItems = toDoSaver.getToDoItems();
      this.toDoItems.forEach(item => {
        this.renderToDoItem(item,
          () => this.onMarkAsDone(item),
          () => this.removeElementById(item.id)
        );
      });
    }
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

  // renderToDoItems() {
  //
  // }

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

  onMarkAsDone(item) {
    if (item.toggle === false || item.toggle === undefined) {
      item.toggle = true;
      item.element.classList.toggle('toDoChecked');
    } else {
      item.toggle = false;
      item.element.classList.toggle('toDoChecked');
    }
    // Переписать под id
  }

  removeElementById(id) {
    this.toDoItems = this.toDoItems.filter((element, index) => {
      if (element.id === id) {
        if (element.element) {
          element.element.remove();
          toDoSaver.removeToDoItems(element);
        } else {
          this.list.querySelector('.toDo').forEach((item, i) => {
            if (item.dataset.id === id) {
              item.remove();
              toDoSaver.removeToDoItems(element);
            }
          });
          //document.querySelector(`div[data-id=${id}]`); ^
        }
      }
      return element.id != id;
    });
    // ВСЕГДА работаем от данных! Исходя из состояния!
  }

  addElement(data) {
    const array = [...this.toDoItems, data];
    const toDoItemIndex = array.indexOf(data);

    array[toDoItemIndex].tags = array[toDoItemIndex].tags.split(/\s+|,\s+|,+/gi);

    const toDoItem = array[toDoItemIndex];
    const toDoElement = this.renderToDoItem(toDoItem,
      () => this.onMarkAsDone(toDoItem),
      () => this.removeElementById(toDoItem.id)
    );

    array[toDoItemIndex].element = toDoElement;

    this.toDoItems = array;
    toDoSaver.setToDoItems(this.toDoItems);
  }
}

class ToDoSaver {
  getToDoItems() {
    return JSON.parse(localStorage.getItem('todos'));
  }

  setToDoItems(array) {
    const localArray = [...array];
    localStorage.setItem('todos', JSON.stringify(localArray));
  }

  removeToDoItems(element) {
    localStorage.removeItem(); //додумать
  }
}

const toDoSaver = new ToDoSaver();
const toDoForm = new ToDoForm(() => document.querySelector('body'));
const toDoList = new ToDoList(() => document.querySelector('body'));


toDoForm.setOnSubmit((data) => {
  toDoList.addElement(data);
});

// нужен класс HTTPClient
