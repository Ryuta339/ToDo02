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
import useSortTodo from '@/composables/use-sort-todo'
import useTodos from '@/composables/use-todos'
import useActionTodo from '@/composables/use-action-todo'

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

    const { todos } = useTodos()
    const { sortTodo } = useSortTodo(todos)

    onMounted(async () => {
      state.todos = await fetchTodo()
    })

    const { addTodo, removeTodo, toggleTodo } = useActionTodo(todos)

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
