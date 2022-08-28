const todoInput = document.querySelector('#todo');
const addTodo = document.querySelector('.submit');
const clearTodo = document.querySelector('.clear');
const todoLists = document.querySelector('#todos');

let todos = [];
let doneTodosArray = [];

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
    if (doneTodosArray.length > 0) {
        let doneLists = document.querySelectorAll('#todos li span');
        let donebtns = document.querySelectorAll('#todos li .done');
        let delbtns = document.querySelectorAll('#todos li .delete');
        for (let j = 0; j < doneLists.length; j++) {
            if (doneLists[doneTodosArray[j]] !== undefined) {
                doneLists[doneTodosArray[j]].classList.add('strike');
            }
        }

        for (let k = 0; k < donebtns.length; k++) {
            if (donebtns[doneTodosArray[k]] !== undefined) {
                donebtns[doneTodosArray[k]].classList.add('btn-disabled');
            }
        }

        for (let l = 0; l < delbtns.length; l++) {
            if (delbtns[doneTodosArray[l]] !== undefined) {
                delbtns[doneTodosArray[l]].classList.add('btn-disabled');
            }
        }
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
    doneTodosArray = [];
    todoInput.value = '';
});

// delete todo
function deleteTodo() {
    let btns = document.querySelectorAll('.delete');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
        todos.splice(i, 1);
        doneTodosArray.splice(i, 1);
        e.target.classList.add('btn-disabled');
        todoLists.replaceChildren();
        showTodo();
        });
    }
}

function doneTodo () {
    let btns = document.querySelectorAll('.done');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
            let todo = document.querySelectorAll('#todos li span');
            todo[i].classList.add('strike');
            doneTodosArray.push(i);
            e.target.classList.add('btn-disabled');
            todoLists.replaceChildren();
            showTodo();
        });
    }
}

