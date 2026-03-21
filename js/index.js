
const BACKEND_ROOT_URL = 'https://todo-backend-9w2v.onrender.com'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

// Рендер одной задачи
const renderTask = (task) => {
    const li = document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('data-key', task.getId().toString())   // важно для удаления

    renderSpan(li, task.getText())
    renderLink(li, task.getId())

    list.append(li)
}

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float: right; cursor: pointer;')
    
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if (li_to_remove) {
                list.removeChild(li_to_remove)
            }
        }).catch((error) => {
            alert(error)
        })
    })
}
// Загрузка всех задач
const getTasks = () => {
  input.disabled = true
  todos.getTasks()
    .then((tasks) => {
      tasks.forEach(task => renderTask(task))
      input.disabled = false
    })
    .catch((error) => {
      alert(error)
    })
}

// Добавление новой задачи
input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    const taskText = input.value.trim()
    if (taskText !== '') {
      todos.addTask(taskText)
        .then((task) => {
          renderTask(task)
          input.value = ''
          input.focus()
        })
        .catch((error) => alert(error))
    }
  }
})

// Запуск при загрузке страницы
getTasks()