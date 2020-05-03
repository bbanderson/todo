const list = document.getElementById("pending");
const finishedUList = document.getElementById("finished");
const form = document.querySelector(".js-todo form");
const userInput = form.querySelector("input");
const TODO_STORAGE = "todos";
const FINISHED_STORAGE = "finished";

let todoList = [];
let finishedList = [];

function saveTodo(obj) {
    localStorage.setItem(TODO_STORAGE, JSON.stringify(obj))
}

function saveFinishedList(obj) {
    localStorage.setItem(FINISHED_STORAGE, JSON.stringify(obj));
}

function handleSubmit(e) {
    e.preventDefault();
    paintList(userInput.value)
    userInput.value = "";
}

function handleFinish(e) {
    list.removeChild(e.target.parentNode);
    const updatedArray = todoList.filter(element => {
        return element.id !== parseInt(e.target.parentNode.id)
    })
    todoList = updatedArray;
    saveTodo(todoList);
    paintFinishedList(e.target.parentNode.innerText)
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

function deleteByBackBtn(target) {
    finishedUList.removeChild(target);
    const updatedArray = finishedList.filter(element => {
        return element.id !== parseInt(target.id)
    })
    finishedList = updatedArray
    saveFinishedList(finishedList)
}

function handleBackForFinishedList(e) {
    const target = e.target.parentNode;
    deleteByBackBtn(target)
    paintList(target.innerText)
}

function handleDeleteForFinishedList(e) {
    finishedUList.removeChild(e.target.parentNode)
    const updatedArray = finishedList.filter(element => {
        return element.id !== parseInt(e.target.parentNode.id)
    })
    finishedList = updatedArray;
    saveFinishedList(finishedList);
}

function paintList(text) {
    const todo = document.createElement("li");
    const DEL_BTN = document.createElement("i");
    const FINISHED_BTN = document.createElement("i");
    const id = todoList.length + 1
    todo.id = id
    DEL_BTN.classList.add("fas")
    DEL_BTN.classList.add("fa-times-circle")
    DEL_BTN.addEventListener("click", handleDelete)
    FINISHED_BTN.classList.add("fas");
    FINISHED_BTN.classList.add("fa-check-circle");
    FINISHED_BTN.addEventListener("click", handleFinish);
    todo.innerText = text;
    todo.appendChild(FINISHED_BTN);
    todo.appendChild(DEL_BTN);
    list.appendChild(todo);
    const obj = {
        id : id,
        text: text,
    }
    todoList.push(obj);
    if (typeOf(text) !== String) {
        const text = document.createElement("p");
        text.innerText = "There's nothing."
        list.appendChild(text);
    }
    
    saveTodo(todoList)
}

function paintFinishedList(text) {
    const finishedLI = document.createElement("li");
    // const finishedSpan = document.createElement("span");
    const DEL_BTN = document.createElement("i");
    const BACK_BTN = document.createElement("i");
    const ID = finishedList.length + 1;
    finishedLI.id = ID;

    BACK_BTN.classList.add("fas");
    BACK_BTN.classList.add("fa-undo-alt");
    BACK_BTN.addEventListener("click", handleBackForFinishedList);
    DEL_BTN.classList.add("fas");
    DEL_BTN.classList.add("fa-times-circle");
    DEL_BTN.addEventListener("click", handleDeleteForFinishedList);
    finishedLI.innerText = text;
    finishedLI.appendChild(BACK_BTN);
    finishedLI.appendChild(DEL_BTN);
    finishedUList.appendChild(finishedLI);

    const finishedObj = {
        id: ID,
        text
    }

    finishedList.push(finishedObj);
    saveFinishedList(finishedList);
}

function loadData() {
    const data = localStorage.getItem(TODO_STORAGE);
    const finishedData = localStorage.getItem(FINISHED_STORAGE);
    if (data !== null) {
        JSON.parse(data).forEach(element => {
            paintList(element.text);
        })
    }
    if (finishedData !== null) {
        JSON.parse(finishedData).forEach(element => {
            paintFinishedList(element.text)
        })
    }
}

form.addEventListener("submit", handleSubmit)

loadData();