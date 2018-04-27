const STORAGE_KEY = 'todos-vuejs-2.0'

export const todoService = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoService.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  },
  filters: [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'active', label: 'Active' },
  ],
}
