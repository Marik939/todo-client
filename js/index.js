const BACKEND_ROOT_URL = 'https://todo-backend-9w2v.onrender.com'

import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)
const list = document.querySelector('ul')
const input = document.querySelector('input')

// render
const renderTask = (task) => {
    const li = document.createElement('li')
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    li.setAttribute('data-key', task.getId())

    li.innerHTML = `
        <span>${task.getText()}</span>
        <a href="#" class="text-danger"><i class="bi bi-trash fs-5"></i></a>
    `

    list.append(li)

    li.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault()
        todos.removeTask(task.getId())
            .then(() => li.remove())
            .catch(err => alert('Ошибка удаления: ' + err.message))
    })
}

// загрузка задач
const getTasks = () => {
    input.disabled = true
    todos.getTasks()
        .then((tasks) => {
            tasks.forEach(task => renderTask(task))
            input.disabled = false
        })
        .catch((error) => {
            console.error(error)
            alert("Не удалось загрузить задачи")
        })
}

// добавление новой задачи
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        const taskText = input.value.trim()
        if (taskText !== '') {
            todos.addTask(taskText).then((task) => {   // ← newTask → task
                renderTask(task)
                input.value = ''
                input.focus()
            })
            .catch(err => alert('Ошибка добавления: ' + err.message))
        }
    }
})

getTasks()