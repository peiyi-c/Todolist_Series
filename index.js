const newTodo = document.getElementById('newTodo')
const myTodos = document.getElementById('myTodos')
const addBtn = document.getElementById('addTodoButton')
// edit option
let editElement;
let editFlag = false;
let editId = '';

// Event Listeners

myTodos.addEventListener('click', checkItem, false)

// add todo item process
function addItem() {
  let inputValue = newTodo.value
  let id = new Date().getTime().toString()

  if (inputValue.trim() == '') {
    alert('Please write something!')
  }
  if (!editFlag) {
    createItem(id, inputValue)
    setBackToDefault()
  } else if (editFlag) {
    editElement.innerHTML = inputValue
    setBackToDefault()
  }
}
// add todo item process 2
function addTodoByEnter() {
  let inputValue = document.getElementById("newTodo");
  inputValue.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("addTodoButton").click();
    }
  });

}
addTodoByEnter()

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
  todo.remove()
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
