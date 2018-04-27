<template>
  <div class="hello">
    <h1>{{ msgTitle }}  <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left</h1>
    <div>
      <input class="new-todo"
        autofocus autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo">
      </div>
    <div>
      <ul class="todo-list">
        <li v-for="todo in filteredTodos" :key="todo.id" class="todo">
          <div class="todo-view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <span>{{ todo.title }}</span>
            <!-- <label @dblclick="editTodo(todo)">{{ todo.title }}</label> -->
            <button class="destroy" @click="removeTodo(todo)">X</button>
          </div>
        </li>
        <li v-show="filteredTodos.length === 0">Nothing to show</li>
      </ul>
    </div>
    <div>
      <ul class="filters">
        <li v-for="filter in filters" :key="filter.value">
          <div>
            <input class="toggle" type="radio" v-model="visability" :value="filter.value" :id="filter.value">
            <label :for="filter.value" :class="{ checked: visability === filter.value }">{{filter.label}}</label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { todoService } from '../common/todo.service'

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

export default {
  name: 'HelloWorld',
  data () {
    return {
      msgTitle: 'ToDoApp',
      newTodo: '',
      visability: 'all',
      todos: todoService.fetch(),
      filters: todoService.filters,
    }
  },
  computed: {
    remaining: function () {
      return filters.active(this.todos).length
    },
    filteredTodos: function () {
      return filters[this.visability](this.todos)
    },
  },
  watch: {
    todos: {
      handler: function (todos) {
        todoService.save(todos)
      },
      deep: true,
    },
  },
  methods: {
    addTodo: function () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoService.uid++,
        title: value,
        completed: false,
      })
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.todos = this.todos.filter(t => t.id !== todo.id)
    },
  },
  filters: {
    pluralize: function (n) {
      return n > 1 ? 'item' : 'items'
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
   padding: 0;
   list-style:  none;
  }

  .hello {
    width: 50%;
    margin: 0 auto;
  }
 .todo-list {
   border: 1px solid black;
 }

 .todo-list li {
   padding: 5px;
 }

 .todo-list li + li {
   border-top: 1px solid black;
 }

 .todo-view {
   display: flex;
   justify-content: space-between;
 }

 .filters {
   display: flex;
   justify-content: center;
 }

 .filters li {
   padding-right: 10px;
 }

 .filters input {
   display: none;
 }

 .checked {
   font-weight: bold;
 }

 .destroy {
   background: none;
   border: none;
 }
</style>
