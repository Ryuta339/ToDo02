import { computed, Ref } from 'vue'
import { Todo } from '@/types/todo'

export default (todos: Ref<Todo[]>) => {
  // Unexpected side effect in computed property
  // を避けるためにslice()を入れている
  const sortTodo = computed(() => todos.value.slice().sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime()
  }))

  return {
    sortTodo
  }
}
