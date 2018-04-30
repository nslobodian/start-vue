import { TodoService } from '../common/todo.service'
import {
  FETCH_TODO,
  FETCH_TODO_START,
  FETCH_TODO_END,
  ADD_TODO,
  SAVE_TODO,
  REMOVE_TODO,
  EDIT_TODO,
} from './action.types'

const state = {
  isLoading: false,
  newTodo: '',
  visability: 'all',
  editedTodo: null,
  beforeEditCache: '',
  todos: [],
  todosCount: 0,
  todosFilters: TodoService.filters,
}

const filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  },
}

const getters = {
  remaining: (state) => {
    return filters.active(state.todos).length
  },
  filteredTodos: (state) => {
    return filters[state.visability](state.todos)
  },
}

const actions = {
  [FETCH_TODO] ({ commit }) {
    commit(FETCH_TODO_START)
    return TodoService.fetch()
      .then((data) => {
        commit(FETCH_TODO_END, data)
      })
      .catch((error) => {
        throw new Error(error)
      })
  },
  [ADD_TODO] ({ dispatch, state }, title) {
    state.todos.push({
      id: state.todosCount++,
      title,
      completed: false,
    })
    dispatch(SAVE_TODO)
  },
  [SAVE_TODO] ({ state }) {
    TodoService.save(state.todos)
  },
  [REMOVE_TODO] ({ dispatch, state }, todo) {
    state.todos = state.todos.filter(t => t.id !== todo.id)
    dispatch(SAVE_TODO)
  },
}

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_TODO_START] (state) {
    state.isLoading = true
  },
  [FETCH_TODO_END] (state, { todos, todosCount }) {
    state.todos = todos
    state.todosCount = todosCount
    state.isLoading = false
  },
  [EDIT_TODO] (state, todo) {
    state.beforeEditCache = todo.title
    state.editedTodo = todo.id
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
