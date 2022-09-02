const todoInput = document.querySelector('#todo');
const addTodo = document.querySelector('.submit');
const clearTodo = document.querySelector('.clear');
const todoLists = document.querySelector('#todos');

let todos = [];

let form = document.querySelector('form');
form.addEventListener('click', e => {
   
    e.preventDefault();
});

function showTodo() {
    for (let i = 0; i < todos.length; i++) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let spanDelBtn = document.createElement('span');
        let spanDoneBtn = document.createElement('span');


        li.classList.add('columns', 'is-size-12', 'pt-2');
        li.append(span);
        span.classList.add('column', 'is-10');
        span.innerText = `${todos[i].name}`;
        todoLists.classList.add('box');
        todoLists.append(li);
        // creates button
        let delBtn = document.createElement('button');
        let doneBtn = document.createElement('button');

        delBtn.classList.add('button', 'is-danger', 'delete-button');
        doneBtn.classList.add('button', 'is-primary', 'done', 'is-check');
        spanDelBtn.classList.add('icon');
        spanDelBtn.innerHTML = '<i class="fa fa-x"></i>';
        delBtn.append(spanDelBtn);

        spanDoneBtn.classList.add('icon');
        spanDoneBtn.innerHTML = '<i class="fa fa-check"></i>';
        doneBtn.append(spanDoneBtn);

        li.append(delBtn);
        li.append(doneBtn);

        let btns = document.querySelectorAll('.done');
        let icon = document.querySelectorAll('#todos li .done i');

        if (todos[i].isChecked == true) {
            span.classList.add('strike');
            btns[i].classList.remove('is-check');
            icon[i].classList.remove('fa-check');
            btns[i].classList.add('is-warning');
            icon[i].classList.add('fa-rotate-left');
        }
    }
    deleteTodo();
    doneTodo();
}

addTodo.addEventListener('click', () => {
    if (!todoInput.value == '') {

        let todo = {name: todoInput.value, isChecked: false};
        todos.push(todo);
        todoInput.value = '';
        todoLists.replaceChildren();
        showTodo();
    }
});

clearTodo.addEventListener('click', () => {
    todoLists.replaceChildren();
    todos = [];
    todoInput.value = '';
});

// delete todo
function deleteTodo() {
    let btns = document.querySelectorAll('.delete-button');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', () => {
        todos.splice(i, 1);
        todoLists.replaceChildren();
        showTodo();
        });
    }
}

function doneTodo() {
    let btns = document.querySelectorAll('.done');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
            let todo = document.querySelectorAll('#todos li > span');
            let icon = document.querySelectorAll('#todos li .done i');
            if (btns[i].classList.contains('is-check')) {
                todos.findIndex(e => {
                    if (e.name == todo[i].innerText) {
                        e.isChecked = true;
                        todo[i].classList.add('strike');
                    }
                });
                btns[i].classList.remove('is-check');
                btns[i].classList.add('is-warning');
                icon[i].classList.remove('fa-check');
                icon[i].classList.add('fa-rotate-left');
            } else {
                todos.findIndex(e => {
                    if (e.name == todo[i].innerText) {
                        e.isChecked = false;
                        todo[i].classList.remove('strike');
                    }
                });
                btns[i].classList.add('is-check');
                btns[i].classList.remove('is-warning');
                icon[i].classList.remove('fa-rotate-left');
                icon[i].classList.add('fa-check');
            }
        });
    }
}
