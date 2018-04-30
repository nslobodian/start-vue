<template>
  <div class="hello">
    <h1><strong>{{ remaining }}</strong> {{ remaining | pluralize }} left</h1>
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
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)">X</button>
          </div>
          <input class="edit" type="text"
            v-model="todo.title"
            v-todo-focus="todo.id === editedTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancleEdit(todo)"
          >
        </li>
        <li v-show="filteredTodos.length === 0">Nothing to show</li>
      </ul>
    </div>
    <div>
      <ul class="filters">
        <li v-for="filter in todosFilters" :key="filter.value">
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
// import { todoService } from '../common/todo.service'
import { mapGetters, mapState } from 'vuex'
import { FETCH_TODO, ADD_TODO, REMOVE_TODO, EDIT_TODO } from '../store/action.types'

export default {
  name: 'HelloWorld',
  data () {
    return {
      newTodo: '',
      // visability: 'all',
      // editedTodo: null,
      // beforeEditCache: '',
      // todos: todoService.fetch(),
      // filters: todoService.filters,
    }
  },
  mounted () {
    this.$store.dispatch(FETCH_TODO)
  },
  computed: {
    ...mapState([
      'todosFilters',
      'todos',
      'editedTodo',
    ]),
    ...mapGetters([
      'remaining',
      'filteredTodos',
    ]),
  },
  methods: {
    addTodo: function () {
      const value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.$store.dispatch(ADD_TODO, value)
      this.newTodo = ''
    },
    removeTodo: function (todo) {
      this.$store.dispatch(REMOVE_TODO, todo)
    },
    editTodo: function (todo) {
      this.$store.commit(EDIT_TODO, todo)
    },
    // doneEdit: function (todo) {
    //   if (!this.editedTodo) {
    //     return
    //   }
    //   this.editedTodo = null
    //   todo.title = todo.title.trim()
    //   if (!todo.title) {
    //     this.removeTodo(todo)
    //   }
    // },
    // cancleEdit: function (todo) {
    //   console.log('canle')
    //   this.editedTodo = null
    //   todo.title = this.beforeEditCache
    // },
  },
  filters: {
    pluralize: function (n) {
      return n > 1 ? 'item' : 'items'
    },
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
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

 .todo-list li + li {
   border-top: 1px solid black;
 }

 .todo-view {
   padding: 5px;
   z-index: 2;
   background-color: #fff;
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

 .todo {
   position: relative;
 }

.edit {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 80%;
  padding-left: 10px;
  z-index: -1;
}

 .edit:focus {
   z-index: 1;
 }
</style>
