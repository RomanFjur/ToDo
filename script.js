class ToDoForm {
  constructor(selector, onSubmit) {
    this.selector = selector;
  }

  createNameInput () {
    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.placeholder = 'My new todo';
    nameInput.classList.add('input');
    this.selector.append(nameInput);
    this.nameInput = nameInput;
  }

  createTagsInput () {
    let tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'todo, important, other...';
    tagsInput.classList.add('input');
    this.selector.append(tagsInput);
    this.tagsInput = tagsInput;
  }

  createSubmitButton () {
    let submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.textContent = 'Create';
    submitButton.classList.add('button');
    this.selector.append(submitButton);
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

  getValues () {
    this.getNameInputValue();
    this.getTagsInputValue();
    console.log('сработало');
  }
}

let toDoForm = new ToDoForm(document.querySelector('body'));

// --------------------------------------
// Это будет работать в последнем классе!
toDoForm.createNameInput();
toDoForm.createTagsInput();
toDoForm.createSubmitButton();

toDoForm.submit.addEventListener('click', () => {
  toDoForm.getValues();
});
// --------------------------------------

class ToDoList {
  constructor(selector, initialState = []) {

  }
  //Methods
}

class ToDosHandle {
  constructor() {

  }
  //Methods
}
