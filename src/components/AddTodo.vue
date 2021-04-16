<template>
  <input type="text" v-model="state.inputValue">
  <button @click="onClick" :disabled="state.hasError">追加</button>
  <p class="error" v-if="state.hasError">タイトルが長すぎ</p>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue'

interface State {
  inputValue: string;
  hasError: boolean;
}

export default defineComponent({
  emits: ['add'],
  setup (_, context) {
    const state = reactive<State>({
      inputValue: '',
      hasError: false
    })

    const onClick = () => {
      context.emit('add', state.inputValue)
      state.inputValue = ''
    }

    watchEffect(() => {
      state.hasError = state.inputValue.length > 10
    })

    return {
      state,
      onClick
    }
  }
})
</script>

<style scoped>
.error {
  color: red;
}
</style>
