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
        span.innerText = `${todos[i].name}`;
        todoLists.append(li);
        // creates button
        let delBtn = document.createElement('button');
        let doneBtn = document.createElement('button');
        delBtn.innerText = 'X';
        delBtn.classList.add('delete');
        doneBtn.classList.add('done');
        li.append(delBtn);
        li.append(doneBtn);

        if (todos[i].isChecked == true) {
            span.classList.add('strike');
            doneBtn.innerText = 'Undone';
        } else {
            doneBtn.innerText = 'Done';
        }
    }
    deleteTodo();
    doneTodo();
}

addTodo.addEventListener('click', () => {
    if (!todoInput.value == '') {
        let todo = {name: todoInput.value, isChecked: false};
        todos.push(todo);
        todoLists.replaceChildren();
        showTodo();
        todoInput.value = '';
    }
});

clearTodo.addEventListener('click', () => {
    todoLists.replaceChildren();
    todos = [];
    doneTodosArray = [];
    isUndoneTodos = [];
    addTodo.classList.remove('btn-disabled');
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

function doneTodo() {
    let btns = document.querySelectorAll('.done');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', e => {
            let todo = document.querySelectorAll('#todos li span');
            if (e.target.innerText == 'Done') {
                todos.findIndex(e => {
                    if (e.name == todo[i].innerText) {
                        e.isChecked = true;
                        todo[i].classList.add('strike');
                    }
                });
                e.target.innerText = 'Undone';
                
            } else {
                todos.findIndex(e => {
                    if (e.name == todo[i].innerText) {
                        e.isChecked = false;
                        todo[i].classList.remove('strike');
                    }
                });
                e.target.innerText = 'Done';
            }
        });

    }
}
