const todoInput = document.querySelector('#todo');
const addTodo = document.querySelector('.submit');
const clearTodo = document.querySelector('.clear');
const todoLists = document.querySelector('#todos');

let todos = [];
let doneTodosArray = [];
let isUndoneTodos = [];

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
    let doneLists = document.querySelectorAll('#todos li span');
        let donebtns = document.querySelectorAll('#todos li .done');
        let delbtns = document.querySelectorAll('#todos li .delete');

    if (doneTodosArray.length > 0) {
        
        for (let j = 0; j < doneLists.length; j++) {
            if (doneLists[doneTodosArray[j]] !== undefined) {
                doneLists[doneTodosArray[j]].classList.add('strike');
            }
        }
       
       
            for (let k = 0; k < donebtns.length; k++) {
                let todoIndex = todos.indexOf(doneTodosArray[k]);
                 if (donebtns[todoIndex] !== undefined) {
                     donebtns[todoIndex].innerText = 'Undone';
                     doneLists[todoIndex].classList.add('strike');
                 }
            }
          
        for (let l = 0; l < delbtns.length; l++) {
            if (delbtns[doneTodosArray[l]] !== undefined) {
                delbtns[doneTodosArray[l]].classList.add('btn-disabled');
            }
        }

    }

    if (isUndoneTodos.length > 0) {
        for (let m = 0; m < isUndoneTodos.length; m++) {
                let index = todos.indexOf(isUndoneTodos[m]);
                doneLists[index].classList.remove('strike');
                donebtns[index].innerText = 'Done';
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
                if (!doneTodosArray.includes(todo[i].innerText)) {
                    doneTodosArray.push(todo[i].innerText);
                }
                todo[i].classList.add('strike');
                e.target.innerText = 'Undone';
                
            } else {
                e.target.innerText = 'Done';
                todo[i].classList.remove('strike');

                // prevent to add same todo
                if (!isUndoneTodos.includes(todo[i].innerText)) {
                    isUndoneTodos.push(todo[i].innerText);
                }
               
            }
            
        });

    }
}
