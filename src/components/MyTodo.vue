<template>
  <todo-list
    v-for="todo in sortTodo"
    :todo="todo"
    :key="todo.id"
    @toggle="toggleTodo"
    @remove="removeTodo"
  />
  <add-todo
    @add="addTodo"
  />
</template>

<script lang="ts">
import { toRefs, defineComponent, reactive, watchEffect, onMounted } from 'vue'
import TodoList from '@/components/TodoList.vue'
import AddTodo from '@/components/AddTodo.vue'
import { fetchTodo } from '@/api'
import { Todo } from '@/types/todo'
import { v4 as uuid } from 'uuid'
import useSortTodo from '@/composables/use-sort-todo'

interface State {
  todos: Todo[];
}

export default defineComponent({
  components: {
    TodoList,
    AddTodo
  },
  setup () {
    const state = reactive<State>({
      todos: []
    })

    const { todos } = toRefs(state)
    const { sortTodo } = useSortTodo(todos)

    onMounted(async () => {
      state.todos = await fetchTodo()
    })

    const addTodo = (title: string) => {
      state.todos = [...state.todos, {
        id: uuid(),
        title,
        done: false,
        createdAt: new Date()
      }]
    }

    const removeTodo = (id: string) => {
      state.tidis = state.todos.filter(todo => todo.id !== id)
    }

    const toggleTodo = (id: string) => {
      const todo = state.todo.find(todo => todo.id === id)
      if (!todo) return
      todo.done = !todo.done
    }

    watchEffect(() => console.log(state.todos))

    return {
      sortTodo,
      addTodo,
      removeTodo,
      toggleTodo
    }
  }
})
</script>
