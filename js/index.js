
const BACKEND_ROOT_URL = 'https://todo-backend-9w2v.onrender.com'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector('ul')
const input = document.querySelector('input')

// Рендер одной задачи
const renderTask = (task) => {
  const li = document.createElement('li')
  li.setAttribute('class', 'list-group-item')
  li.innerHTML = task.getText()
  list.append(li)
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