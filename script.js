const todoInput = document.querySelector('#todo');
const addTodo = document.querySelector('.submit');
const clearTodo = document.querySelector('.clear');
const todoLists = document.querySelector('#todos');
const notification = document.querySelector('.notification');
const deleteNotification = document.querySelector('.notification .delete');

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
        let divBtnContainer = document.createElement('div');


        li.classList.add('columns', 'is-size-12', 'pt-2');
        li.append(span);
        li.append(divBtnContainer);
        span.classList.add('column', 'is-9-desktop', 'is-12-mobile', 'task-content');
        span.innerText = `${todos[i].name.replace(/.{50}/g, '$&\n')}`;
        todoLists.append(li);

        // creates button
        let delBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        divBtnContainer.classList.add('column', 'is-12-mobile', 'button-container');
       
        divBtnContainer.append(doneBtn);
        divBtnContainer.append(delBtn);

        delBtn.classList.add('button', 'is-danger', 'delete-button');
        doneBtn.classList.add('button', 'done', 'is-check');
        spanDelBtn.classList.add('icon');
        spanDelBtn.innerHTML = '<i class="fa-solid fa-minus"></i>';
        delBtn.append(spanDelBtn);

        spanDoneBtn.classList.add('icon');
        spanDoneBtn.innerHTML = '<i class="fa fa-check"></i>';
        doneBtn.append(spanDoneBtn);

        li.append(divBtnContainer);
        
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
        let checkTodo = todos.some(task => {
            if (task.name === todo.name) {
                return true;
            } else {
                return false;
            }
        });

        if (!checkTodo) {
            todos.push(todo);
            todoInput.value = '';
            // checks if there are still notification error
            if (todoInput.classList.contains('is-danger')) {
                todoInput.classList.remove('is-danger');
                notification.style.display = 'none';
            }
        } else {
            todoInput.value = todo.name;
            todoInput.classList.add('is-danger');
            notification.style.display = 'block';
        }

        todoLists.replaceChildren();
        showTodo();
    }
});

clearTodo.addEventListener('click', () => {
    todoLists.replaceChildren();
    todos = [];
    todoInput.value = '';
    notification.style.display = 'none';
    todoInput.classList.remove('is-danger');
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

// Delete Notification

deleteNotification.addEventListener('click', () => {
    notification.style.display = 'none';
    todoInput.classList.remove('is-danger');
});
