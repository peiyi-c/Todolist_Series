const newTodo = document.getElementById('newTodo')
const myTodos = document.getElementById('myTodos')
const addBtn = document.getElementById('addTodoButton')

// edit mode 
let editElement;
let editFlag = false;
let editId = '';

// Event Listeners
myTodos.addEventListener('click', checkItem, false)
newTodo.addEventListener('keyup', addItemByEnter)
window.addEventListener('DOMContentLoaded', loadLocalStorage)

// add todo item process
function addItem() {
  let inputValue = newTodo.value
  let id = new Date().getTime().toString()

  if (inputValue.trim() == '') {
    alert('Please write something!')
  }
  if (!editFlag) {
    createItem(id, inputValue)
    addToLocalStorage(id, inputValue)
    setBackToDefault()
  } else if (editFlag) {
    editElement.innerHTML = inputValue
    editLocalStorage(editId, inputValue)
    setBackToDefault()
  }
}

// add todo item process 2
function addItemByEnter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    document.getElementById("addTodoButton").click();
  }
}

// create todo item
function createItem(id, value) {
  const li = document.createElement('li')
  let attr = document.createAttribute('data-id');
  attr.value = id
  li.setAttributeNode(attr)
  li.innerHTML = `
          <span>${value}</span>
          <span class="todo__editButton"><i class="fas fa-edit"></i></span>
          <span class="todo__closeButton"><i class="fas fa-trash"></i></span>`

  // addEventListner to trash icon 
  const deleteBtn = li.querySelector('.fa-trash')
  deleteBtn.addEventListener('click', removeItem)
  const editBtn = li.querySelector('.fa-edit')
  editBtn.addEventListener('click', editItem)

  // append todo to list 
  myTodos.appendChild(li)
}

// edit todo item
function editItem(e) {
  let li = e.target.parentElement.parentElement
  let id = li.dataset.id
  editElement = e.target.parentElement.previousElementSibling
  newTodo.value = editElement.innerHTML
  editFlag = true
  editId = id
  addBtn.textContent = 'Edit'
}

// remove todo item
function removeItem(e) {
  let todo = e.target.parentElement.parentElement
  let id = todo.dataset.id
  console.log(todo)
  todo.remove()
  removeFromLocalStorage(id)
}

// check todo item
function checkItem(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
}

// set back to default
function setBackToDefault() {
  let timer;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    newTodo.value = "";
    editFlag = false;
    editId = "";
    addBtn.textContent = "Add"
  }, 100)

}

// * Local Storage * //
function addToLocalStorage(id, value) {
  const todo = { id, value }
  let todos = getLocalStorage()
  todos.push(todo)
  localStorage.setItem('todoList', JSON.stringify(todos))
}

function removeFromLocalStorage(id) {
  let todos = getLocalStorage() || []
  todos = todos.filter((todo) => {
    if (todo.id !== id) {
      return todo
    }
  })
  localStorage.setItem("todoList", JSON.stringify(todos))
}

function editLocalStorage(id, value) {
  let todos = getLocalStorage()
  todos.map((todo) => {
    if (todo.id == id) {
      todo.value = value
    }
    return todo
  })
  localStorage.setItem('todoList', JSON.stringify(todos))
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('todoList')) || []
}

function loadLocalStorage() {
  let todos = getLocalStorage()
  if (todos.length) {
    todos.forEach((todo) => {
      createItem(todo.id, todo.value)
    })
  }
}

