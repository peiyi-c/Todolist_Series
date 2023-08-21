// initial variables
let addBtn = document.querySelector('#add-btn') // add button
let input = document.querySelector('#new-todo') // input field

let listArea = document.querySelector('#list-area') // todo area & done area
let todoArea = document.querySelector('.todo') // todo area
let todoList = document.querySelector('#my-todo') // todo ul

let doneArea = document.querySelector('.done') // done area
let doneList = document.querySelector('#done-list') // done ul


// sample data
const todos = ['Hit the gym', 'Read a book', 'Buy eggs', 'Organize office', 'Pay bills']
for (let todo of todos) {
  addItem(todo)
}

// Function: add new todo
function addTodo() {
  let inputValue = input.value
  if (!inputValue.trim()) {
    alert('Please write something.')
  } else {
    addItem(inputValue)
  }
  setTimeout(() => input.value = "", 100);
}

// Function: create new todo 
function addItem(text) {
  let newItem = document.createElement('li')
  newItem.innerHTML = `
    <label for="todo">${text}</label>
    <i class="delete fa fa-trash align-middle"></i>
  `
  todoList.appendChild(newItem)
  emptyCheck()
}

// Function: hide list title if list is empty 
function emptyCheck() {
  todoList.childElementCount === 0 ?
    todoArea.firstElementChild.style.display = "none" :
    todoArea.firstElementChild.style.display = "block"

  doneList.childElementCount === 0 ?
    doneArea.firstElementChild.style.display = "none" :
    doneArea.firstElementChild.style.display = "block"
}


// EventListener: click 
addBtn.addEventListener('click', addTodo)

// EventListener: enter
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) { // event.key === "Enter"
    addTodo()
  }
});

// EventListener: delete todo or change todo to done 

listArea.addEventListener('click', function (event) {
  let target = event.target
  let parentElement = target.parentElement

  if (target.classList.contains('delete')) {
    parentElement.remove()

  } else if (target.tagName === 'LABEL') {
    if (!target.classList.contains("checked")) {
      target.classList.toggle('checked')
      doneList.appendChild(parentElement)

    } else {
      target.classList.remove('checked')
      todoList.appendChild(parentElement)
    }
  }
  emptyCheck()
})

