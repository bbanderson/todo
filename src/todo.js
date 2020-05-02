const list = document.querySelector(".js-todo ul");
const form = document.querySelector(".js-todo form");
const userInput = form.querySelector("input");
const TODO_STORAGE = "todos";

let todoList = [];

function saveTodo(arr) {
    localStorage.setItem(TODO_STORAGE, JSON.stringify(arr))
}

function handleSubmit(e) {
    e.preventDefault();
    paintList(userInput.value)
    userInput.value = "";
}

function handleDelete(e) {
    console.log(e.target.parentNode.id)
    list.removeChild(e.target.parentNode)
    const updatedArray = todoList.filter(element => {
        return element.id !== parseInt(e.target.parentNode.id)
    })
    console.log(updatedArray)
    todoList = updatedArray
    saveTodo(todoList)
}

function paintList(text) {
    const todo = document.createElement("li");
    const button = document.createElement("button");
    const id = todoList.length + 1
    todo.id = id
    button.innerText = "❌";
    button.addEventListener("click", handleDelete)
    todo.innerText = text;
    todo.appendChild(button);
    list.appendChild(todo);
    const obj = {
        id : id,
        text: text,
    }
    todoList.push(obj);
    saveTodo(todoList)
}

function loadData() {
    const data = localStorage.getItem(TODO_STORAGE);
    if (data !== null) {
        JSON.parse(data).forEach(element => {
            paintList(element.text);
        })
    }
}

form.addEventListener("submit", handleSubmit)

loadData();