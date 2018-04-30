const STORAGE_KEY = 'todos-vuejs-2.0'

export const TodoService = {
  fetch: function () {
    return new Promise((resolve) => {
      const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      todos.forEach(function (todo, index) {
        todo.id = index
      })
      TodoService.uid = todos.length
      resolve({
        todos,
        todosCount: TodoService.uid,
      })
    })
  },
  save: function (todos) {
    return new Promise((resolve) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
      resolve()
    })
  },
  filters: [
    { value: 'all', label: 'All' },
    { value: 'completed', label: 'Completed' },
    { value: 'active', label: 'Active' },
  ],
}
