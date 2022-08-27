const todoInput = document.querySelector('#todo');
const addTodo = document.querySelector('.submit');
const clearTodo = document.querySelector('.clear');
const todoLists = document.querySelector('#todos');

let todos = [];

function showTodo() {
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        li.append(span);
        span.innerText = `${todos[i]}`;
        todoLists.append(li);
        // creates button
        let delBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        delBtn.innerText = 'X';
        doneBtn.innerText = 'Done';
        delBtn.classList.add('delete');
        doneBtn.classList.add('done');
        li.append(delBtn);
        li.append(doneBtn);
    }
    deleteTodo();
    doneTodo();
}

addTodo.addEventListener('click', () => {
    if (!todoInput.value == '') {
        todos.push(todoInput.value);
        todoLists.replaceChildren();
        showTodo();
        todoInput.value = '';
    }
});

clearTodo.addEventListener('click', () => {
    todoLists.replaceChildren();
    todos = [];
    todoInput.value = '';
});

// delete todo
function deleteTodo() {
    let btns = document.querySelectorAll('.delete');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
        todos.splice(i, 1);
        todoLists.replaceChildren();
        showTodo();
        });
    }
}

function doneTodo () {
    let btns = document.querySelectorAll('.done');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
            let todo = document.querySelectorAll('#todos li span');
            todo[i].classList.add('strike');
        });
    }
}

