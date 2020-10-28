class IdGenerator {
  static getNewId(length = 10) {
    let newId = '';
    const avaliableSymbols = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for (var i = 0; i < length; i++) {
      let randomSymbolIndex = Math.floor(Math.random() * avaliableSymbols.length);
      newId = `${newId}${avaliableSymbols[randomSymbolIndex]}`;
    }
    return newId;
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

    this.toDos = [];

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

  renderToDoItems() {
    // Пока не продумывал
  }

  renderToDoItem(toDoItem, onMarkAsDone) {

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

    // 1. Разобрать строку tags с помощью регулярки (должен быть массивом) +-
    // 2. С помощью reduce собрать строку с тегами из массива с тегами +-

    toDoName.textContent = `${toDoItem.name}`;
    toDoTags.textContent = `${toDoItem.tags}`; // работать с массивом тут

    this.list.append(toDo);
    toDo.append(checkboxLabel);
    checkboxLabel.append(toDoCheckbox);
    checkboxLabel.append(checkboxSpan);
    toDo.append(toDoName);
    toDo.append(toDoDeleteButton);
    toDo.append(toDoTags);

    toDo.dataset.id = toDoItem.id;
    this.toDos.push(toDo); // при удалении обратиться к parentNode, считать id

    toDoCheckbox.addEventListener('click', () => {
      if (toDoItem.toggle === false) {
        toDoItem.toggle = true;
        toDoName.classList.toggle('nameChecked');
        toDoTags.classList.toggle('tagsChecked');
      } else {
        toDoItem.toggle = false;
        toDoName.classList.toggle('nameChecked');
        toDoTags.classList.toggle('tagsChecked');
      }
    }); // пока что так, потом переделать (вынести в отдельную функцию) onMarkAsDone!!

    toDoDeleteButton.addEventListener('click', () => {
      this.removeElementById(toDoItem.id);
    });

    // 1. Добавить аргумент toDoItem который использовать в качестве элемента +
    // 2. Самоудаление listener +
    // 3. Добавить функционал ID и его подключение к DOM-елементу и к toDoItems +
  }

  removeElementById(id) {
    this.toDoItems.forEach((item, i) => {
      if (item.id === id) {
        this.toDos[i].remove();
        this.toDos.splice(i, 1);
        localStorage.removeItem(`todo №${item.todoNumber}`);
        this.toDoItems.splice(i, 1);
        this.toDoItems = this.toDoItems;
      }
    });

    // 1. Вместо массива toDos - записываем в поле element сам DOM-элемент
    // 2. Переписываем функцию под filter
    // для удаления элемента (через remove если поле element есть) или если этого поля нет (начинаем искать с помощью селектора);
    // Новый класс для (localStorage) ToDoSaver (getToDoItems и setToDoItems(array));

    // ВСЕГДА работаем от данных! Исходя из состояния!
  }

  addElement(data) {
    const array = [...this.toDoItems, data];
    this.toDoItems = array; //в Конец (не менять ссылку)!

    const toDoItemIndex = this.toDoItems.indexOf(data);
    this.toDoItems[toDoItemIndex].toggle = false;
    this.toDoItems[toDoItemIndex].id = IdGenerator.getNewId();
    this.toDoItems[toDoItemIndex].tags = `#${this.toDoItems[toDoItemIndex].tags
      .split(/\s+|,\s+|,+/gi)
      .reduce((sum, current) => sum + ' #' + current)}`;

    // Дополнительно для LocalStorage
    this.toDoItems[toDoItemIndex].todoNumber = toDoItemIndex + 1;

    const toDoItem = this.toDoItems[toDoItemIndex];
    localStorage.setItem(`todo №${toDoItem.todoNumber}`, toDoItem); // к строке

    this.renderToDoItem(toDoItem);
  }
}

const toDoForm = new ToDoForm(() => document.querySelector('body'));
const toDoList = new ToDoList(() => document.querySelector('body'));

toDoForm.setOnSubmit((data) => {
  toDoList.addElement(data);
});

// 1. Теория: Что такое генераторы (генератор случайных чисел);
// 2. Добиваю практику:
//    - class ToDoSaver для работы с localStorage;
//    - перенос вызова toDoItems = array в конец, так же замена работы функции на работу с array;
//    - добавить поле element со ссылкой на DOM-элемент;
//    - запись id как data-attribute (закончить с удалением по id);
//    - реализовать onMarkAsDone в renderToDoItem;
//
//                    СПЕРВА node.js!!!
//
// 3. https://tproger.ru/translations/javascript-important-concepts/
// 4. https://proglib.io/p/beginners-guide-to-node-js/
// 5. https://nodejs.dev/learn/introduction-to-nodejs
