class ToDoForm {
  constructor(selector, onSubmit) {
    this.selector = selector;
  }

  createForm () {
    let form = document.createElement('form');
    form.classList.add('form');
    this.selector.append(form);
    this.form = form;
  }

  createNameInput () {
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'My new todo';
    nameInput.classList.add('input');
    this.form.append(nameInput);
    this.nameInput = nameInput;
  }

  createTagsInput () {
    let tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'todo, important, other...';
    tagsInput.classList.add('input');
    this.form.append(tagsInput);
    this.tagsInput = tagsInput;
  }

  createSubmitButton () {
    let submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Create';
    submitButton.classList.add('button');
    this.form.append(submitButton);
    this.submit = submitButton;
  }

  getNameInputValue () {
    this.nameInputValue = this.nameInput.value;
    console.log(this.nameInputValue);
  }

  getTagsInputValue () {
    this.tagsInputValue = this.tagsInput.value;
    console.log(this.tagsInputValue);
  }

  cleanInputs () {
    this.nameInput.value = '';
    this.tagsInput.value = '';
  }

  getValues () {
    this.getNameInputValue();
    this.getTagsInputValue();
    this.cleanInputs();
  }
}

let toDoForm = new ToDoForm(document.querySelector('body'));

// --------------------------------------
// Это будет работать в последнем классе!
toDoForm.createForm();
toDoForm.createNameInput();
toDoForm.createTagsInput();
toDoForm.createSubmitButton();

toDoForm.submit.addEventListener('click', () => {
  toDoForm.getValues();
});
// --------------------------------------

class ToDoList {
  constructor(selector) {
    this.selector = selector;
  }

  createToDoList () {
    let toDoList = document.createElement('div');
    toDoList.classList.add('toDoList');
    this.selector.append(toDoList);
  }

  createToDoName () {

  }

  createToDoTags () {

  }

  createDoneCheckboxes () {

  }

  createDeleteButtons () {

  }
}

let toDoList = new ToDoList(document.querySelector('body'));
toDoList.createToDoList();

class ToDosHandle {
  constructor() {

  }
}
