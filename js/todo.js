<<<<<<< HEAD
const todoForm = document.getElementById('todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let todos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.classList.add('removing');
    setTimeout(() => {
        li.remove();
        todos = todos.filter(todo => todo.id !== parseInt(li.id));
        saveTodos();
    }, 300); // Match the duration with CSS animation
}

function toggleComplete(event) {
    const li = event.target.parentElement;
    const span = li.querySelector('span');
    const todo = todos.find(todo => todo.id === parseInt(li.id));
    todo.completed = !todo.completed;
    span.classList.toggle('completed', todo.completed);
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;

    const span = document.createElement('span');
    span.textContent = newTodo.text;
    if (newTodo.completed) {
        span.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = '✅';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', toggleComplete);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteTodo);

    li.appendChild(completeButton);
    li.appendChild(span);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        completed: false,
    };
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach(paintTodo);
}
=======
const todoForm = document.getElementById('todo-form');
const todoInput = todoForm.querySelector('input');
const todoList = document.getElementById('todo-list');

const TODOS_KEY = 'todos';

let todos = [];

function saveTodos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const li = event.target.parentElement;
    li.classList.add('removing');
    setTimeout(() => {
        li.remove();
        todos = todos.filter(todo => todo.id !== parseInt(li.id));
        saveTodos();
    }, 300);
}

function toggleComplete(event) {
    const li = event.target.parentElement;
    const span = li.querySelector('span');
    const todo = todos.find(todo => todo.id === parseInt(li.id));
    todo.completed = !todo.completed;
    span.classList.toggle('completed', todo.completed);
    saveTodos();
}

function paintTodo(newTodo) {
    const li = document.createElement('li');
    li.id = newTodo.id;

    const span = document.createElement('span');
    span.textContent = newTodo.text;
    if (newTodo.completed) {
        span.classList.add('completed');
    }

    const completeButton = document.createElement('button');
    completeButton.textContent = '✅';
    completeButton.classList.add('complete-button');
    completeButton.addEventListener('click', toggleComplete);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', deleteTodo);

    li.appendChild(completeButton);
    li.appendChild(span);
    li.appendChild(deleteButton);

    todoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = '';
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
        completed: false,
    };
    todos.push(newTodoObj);
    paintTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);
if (savedTodos) {
    todos = JSON.parse(savedTodos);
    todos.forEach(paintTodo);
}
>>>>>>> 8801b12bb5296acae16b62357b16eff1519123ad
