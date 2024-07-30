const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function toggleComplete(event) {
    const li = event.target.parentElement;
    const span = li.querySelector("span");
    span.classList.toggle("completed");

    toDos = toDos.map(toDo => {
        if (toDo.id === parseInt(li.id)) {
            return { ...toDo, completed: !toDo.completed };
        }
        return toDo;
    });
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    if (newTodo.completed) {
        span.classList.add("completed");
    }

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "❌";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", deleteToDo);

    const completeButton = document.createElement("button");
    completeButton.innerText = "✅";
    completeButton.className = "complete-button";
    completeButton.addEventListener("click", toggleComplete);

    li.appendChild(completeButton);
    li.appendChild(span);
    li.appendChild(deleteButton);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        completed: false
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
