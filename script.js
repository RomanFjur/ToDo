class IdGenerator {
  static getNewId(length = 10) {
    // let newId = '';
    // const avaliableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    // for (var i = 0; i < length; i++) {
    //   let randomSymbolIndex = Math.floor(Math.random() * avaliableSymbols.length);
    //   newId = `${newId}${avaliableSymbols[randomSymbolIndex]}`;
    // }
    // return newId;

    const avaliableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    function* generateIndexNumber(start, end) {
      for (let i = start; i < end; i++) {
        yield Math.floor(Math.random() * avaliableSymbols.length);
      }
    }

    function* generateId() {
      yield* generateIndexNumber(0, 10);
    }

    let id = '';

    for (let index of generateId()) {
      id += avaliableSymbols[index];
    }

    return id;
  }
}

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
    form.method = 'post';
    form.action = 'http://localhost:3000/todos';
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
    submitButton.type = 'submit';
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
      // if (localStorage.length === 0) {
      //   this.renderEmptyLabel();
      // } else {
      //   this.deleteEmptyLabel();
      //   toDoSaver.getToDoItems();
      // }
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
    this.empty.remove();
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
    toDoTags.textContent = `${toDoItem.tags}`; // работать с массивом тут!!!!!!

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

    // 1. Вместо массива toDos - записываем в поле element сам DOM-элемент +
    // 2. Переписываем функцию под filter +
    // для удаления элемента (через remove если поле element есть) или если этого поля нет (начинаем искать с
    // помощью селектора); +-
    // Новый класс для (localStorage) ToDoSaver (getToDoItems и setToDoItems(array));

    // ВСЕГДА работаем от данных! Исходя из состояния!
  }

  addElement(data) {
    const array = [...this.toDoItems, data];
    const toDoItemIndex = array.indexOf(data);

    array[toDoItemIndex].id = IdGenerator.getNewId();
    array[toDoItemIndex].tags = `${array[toDoItemIndex].tags.split(/\s+|,\s+|,+/gi)}`;
    array[toDoItemIndex].todoNumber = toDoItemIndex + 1;

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
  // getToDoItems() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     toDoList.addElement(JSON.parse(localStorage.getItem(`Task №${i + 1}`)));
  //   }
  // }

  setToDoItems(array) {
    const localArray = [...array];
    for (let i = 0; i < array.length; i++) {
      localStorage.setItem(`Task №${localArray[i].todoNumber}`, `${JSON.stringify(localArray[i])}`);
    }
  }

  removeToDoItems(element) {
    localStorage.removeItem(`Task №${element.todoNumber}`);
  }
}

const toDoForm = new ToDoForm(() => document.querySelector('body'));
const toDoList = new ToDoList(() => document.querySelector('body'));
const toDoSaver = new ToDoSaver();

toDoForm.setOnSubmit((data) => {
  toDoList.addElement(data);
});

// 1. Теория: Что такое генераторы (генератор случайных чисел) +-;
// 2. Добиваю практику:
//    - class ToDoSaver для работы с localStorage; - (Доработать! Сделать его простым)
//    - перенос вызова toDoItems = array в конец, так же замена работы функции на работу с array; +
//    - добавить поле element со ссылкой на DOM-элемент; +
//    - запись id как data-attribute (закончить с удалением по id); +
//    - реализовать onMarkAsDone в renderToDoItem; +-
//
//                    СПЕРВА node.js!!!
//
// 3. https://tproger.ru/translations/javascript-important-concepts/
// 4. https://proglib.io/p/beginners-guide-to-node-js/
// 5. https://nodejs.dev/learn/introduction-to-nodejs

// у ToDoList (в конструкторе функция rehydrate);
//  - считать с помощью toDoSaver
//  - заменить this.toDoItems
//  - отрисовать (рендер)
//  1. Закончить практику
//  2. Express
