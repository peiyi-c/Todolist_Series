// ** Create a "x" button and append it to each list item ** //
const myTodoList = document.getElementsByTagName('li')
for (i = 0; i < myTodoList.length; i++) {
  const span = document.createElement('span')
  const doneSign = document.createTextNode('\u00D7')
  span.className = 'todo__closeButton'
  span.appendChild(doneSign)
  myTodoList[i].appendChild(span)
}

// ** Clicking on 'x' button can hide a todo ** //
const closeButton = document.getElementsByClassName("todo__closeButton");
for (i = 0; i < closeButton.length; i++) {
  closeButton[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
  }
}

// ** Add a "checked" symbol when clicking on a list item ** //
const list = document.querySelector('ul');
list.addEventListener('click', function (e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
}, false);

// ** Create a new list item when clicking on the "Add" button ** //
function newElement() {
  let inputValue = document.getElementById("newTodo").value;
  let li = document.createElement("li");
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue.trim() === '') {
    alert("Oohh, too fast!! You must write something!");
  } else {
    document.getElementById("myTodos").appendChild(li);
  }

  setTimeout(() => document.getElementById("newTodo").value = "", 100); // Empty input after a new todo is created

  const span = document.createElement("span");
  const txt = document.createTextNode("\u00D7");
  span.className = "todo__closeButton";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < closeButton.length; i++) {
    closeButton[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
}

// ** Also, create a new list item when press enter in input ** //
let inputValue = document.getElementById("newTodo");
inputValue.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addTodoButton").click();
  }
});

